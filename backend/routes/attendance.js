const express = require('express');
const Attendance = require('../models/Attendance');
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/role');

const router = express.Router();

// Mark attendance (faculty)
router.post('/mark', auth, requireRole('faculty'), async (req, res) => {
  try {
    const { eventId, userId, status } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    const attendance = await Attendance.create({ eventId, userId, status });
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get attendance data by event (for FacultyAttendance page)
router.get('/event/:eventId', auth, requireRole('faculty'), async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const attendanceRecords = await Attendance.find({ eventId }).populate('userId');

    const students = attendanceRecords.map(record => ({
      _id: record.userId._id,
      name: record.userId.name,
      rollNumber: record.userId.rollNumber,
      status: record.status,
      checkedInAt: record.checkInTime
    }));

    res.json({
      eventId,
      eventTitle: event.title,
      students
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get attendance by user
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const records = await Attendance.find({ userId: req.params.userId }).populate('eventId');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update or create attendance for a specific student in an event
router.put('/event/:eventId/student/:studentId', auth, requireRole('faculty'), async (req, res) => {
  try {
    const { status } = req.body;
    const { eventId, studentId } = req.params;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Find existing attendance
    let attendance = await Attendance.findOne({ eventId, userId: studentId });

    if (attendance) {
      attendance.status = status;
      attendance.checkInTime = status === 'present' ? new Date() : null;
      await attendance.save();
    } else {
      attendance = await Attendance.create({
        eventId,
        userId: studentId,
        status,
        checkInTime: status === 'present' ? new Date() : null
      });
    }

    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router; 