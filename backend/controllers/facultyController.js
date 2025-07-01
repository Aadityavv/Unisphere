// backend/controllers/facultyController.js
const Event = require('../models/Event');
const Attendance = require('../models/Attendance');
const Registration = require('../models/Registration');

exports.getFacultyDashboard = async (req, res) => {
    try {
        const facultyId = req.user._id;

        // 1. All events created by this faculty
        const events = await Event.find({ organizerId: facultyId });

        const totalEvents = events.length;
        const upcomingEvents = events.filter(e => new Date(e.dateTime) > new Date()).length;

        const eventIds = events.map(e => e._id);

        // 2. Total attendees for faculty's events
        const totalAttendees = await Attendance.countDocuments({
            eventId: { $in: eventIds },
            status: 'present'
        });

        // 3. Average attendance per event
        const attendancePerEvent = await Attendance.aggregate([
            { $match: { eventId: { $in: eventIds }, status: 'present' } },
            { $group: { _id: "$eventId", count: { $sum: 1 } } }
        ]);

        const averageAttendance = attendancePerEvent.length > 0
            ? Math.round(attendancePerEvent.reduce((sum, e) => sum + e.count, 0) / attendancePerEvent.length)
            : 0;

        // 4. Attendance Trend (by month)
        const trend = await Attendance.aggregate([
            { $match: { eventId: { $in: eventIds }, status: 'present' } },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    attendance: { $sum: 1 }
                }
            },
            {
                $project: {
                    month: "$_id",
                    attendance: 1,
                    _id: 0
                }
            },
            { $sort: { month: 1 } }
        ]);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const attendanceTrend = trend.map(t => ({
            month: monthNames[t.month - 1],
            attendance: t.attendance
        }));

        // 5. Event Categories (fake categories based on title for now)
        const eventCategories = [
            { name: "Workshop", value: events.filter(e => e.title.toLowerCase().includes("workshop")).length, color: "#8884d8" },
            { name: "Cultural", value: events.filter(e => e.title.toLowerCase().includes("cultural")).length, color: "#82ca9d" },
            { name: "Tech", value: events.filter(e => e.title.toLowerCase().includes("tech")).length, color: "#ffc658" }
        ].filter(c => c.value > 0); // remove 0s

        // 6. Recent Events (latest 5)
        const recentEvents = await Event.find({ organizerId: facultyId })
            .sort({ dateTime: -1 })
            .limit(5)
            .lean();

        // Attach attendance count to each
        for (let ev of recentEvents) {
            ev.attendees = await Attendance.countDocuments({ eventId: ev._id, status: 'present' });
            ev.status = new Date(ev.dateTime) < new Date() ? 'completed' : 'upcoming';
        }

        res.json({
            totalEvents,
            upcomingEvents,
            totalAttendees,
            averageAttendance,
            attendanceTrend,
            eventCategories,
            recentEvents
        });
    } catch (err) {
        console.error("Error in getFacultyDashboard", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
