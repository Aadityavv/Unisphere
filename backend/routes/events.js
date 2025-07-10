// backend/routes/events.js

const express = require('express');
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const { getFacultyDashboard } = require('../controllers/facultyController');

const router = express.Router();

/* ────────────── 1. FACULTY ROUTES ────────────── */

// Faculty dashboard analytics
router.get('/faculty/dashboard', auth, requireRole('faculty'), getFacultyDashboard);

// Create event
router.post('/create', auth, requireRole('faculty'), async (req, res) => {
  try {
    const { title, description, dateTime, duration, location, clubId } = req.body;

    const event = await Event.create({
      title,
      description,
      dateTime,
      duration,
      location,
      clubId,
      organizerId: req.user._id,
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ────────────── 2. STUDENT ROUTES ────────────── */

// Events registered by a student
router.get('/student/:userId', auth, async (req, res) => {
  try {
    const regs = await Registration.find({ userId: req.params.userId }).populate('eventId');
    res.json(regs.map(r => r.eventId));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ────────────── 3. PUBLIC / SHARED ROUTES ────────────── */

// Get all events (with optional filters: club, category, date)
router.get('/', async (req, res) => {
  try {
    const { club, category, date } = req.query;
    const filter = {};

    if (club) filter.clubId = club;
    if (date) filter.dateTime = { $gte: new Date(date) };

    const events = await Event.find(filter).populate('clubId organizerId').lean();

    for (const ev of events) {
      ev.registrationCount = await Registration.countDocuments({ eventId: ev._id });
    }

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ────────────── 4. EVENT CRUD ────────────── */

// Update an event
router.put('/:id', auth, requireRole('faculty'), async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an event (only by its organizer)
router.delete('/:id', auth, requireRole('faculty'), async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      organizerId: req.user._id,
    });

    if (!event)
      return res.status(404).json({ message: 'Event not found or unauthorized' });

    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ────────────── 5. GET SINGLE EVENT ────────────── */

// Get full details of one event (always last to avoid route conflicts)
router.get('/:id', auth, async (req, res) => {
  console.log('GET /api/events/:id route hit');

  try {
    const event = await Event.findById(req.params.id)
        .populate('clubId organizerId')
        .lean();

    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Determine if current user is registered
    const registration = await Registration.findOne({
      userId: req.user._id,
      eventId: req.params.id,
    });

    event.registered = !!registration;

    // Debug logs
    console.log('GET /api/events/:id req.user:', req.user);

    // Populate registered students
    const regs = await Registration.find({ eventId: req.params.id }).populate('userId');
    event.registeredStudentsList = regs.map(r => ({
      id: r.userId?._id,
      name: r.userId?.name,
      email: r.userId?.email,
      rollNumber: r.userId?.rollNumber || '',
      year: r.userId?.year || '',
    }));

    console.log('registeredStudentsList:', event.registeredStudentsList);

    res.json(event);
  } catch (err) {
    console.error('Error in GET /events/:id', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
