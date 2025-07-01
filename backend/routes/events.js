const express = require('express');
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const { getFacultyDashboard } = require('../controllers/facultyController');

const router = express.Router();

/* ────────────── 1.  FACULTY-ONLY DASHBOARD & CREATION ────────────── */

// Faculty analytics
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

/* ────────────── 2.  STUDENT-SPECIFIC ROUTE ────────────── */

// Events a student has registered for
router.get('/student/:userId', auth, async (req, res) => {
  try {
    const regs = await Registration.find({ userId: req.params.userId }).populate('eventId');
    res.json(regs.map(r => r.eventId));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ────────────── 3.  GENERIC COLLECTION QUERIES ────────────── */

// Get all events (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { club, category, date } = req.query;
    const filter = {};
    if (club) filter.clubId = club;
    if (date) filter.dateTime = { $gte: new Date(date) };

    const events = await Event.find(filter).populate('clubId organizerId').lean();

    // append registration count
    for (const ev of events) {
      ev.registrationCount = await Registration.countDocuments({ eventId: ev._id });
    }

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ────────────── 4.  CRUD ON A SINGLE EVENT ────────────── */

// Update event
router.put('/:id', auth, requireRole('faculty'), async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete event
router.delete('/:id', auth, requireRole('faculty'), async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      organizerId: req.user._id,
    });
    if (!event) return res.status(404).json({ message: 'Event not found or unauthorized' });
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single event (keep this last—most generic)
router.get('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('clubId organizerId').lean();
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // is current user (if student) registered?
    const registration = await Registration.findOne({
      userId: req.user._id,
      eventId: req.params.id,
    });
    event.registered = !!registration;

    res.json(event);
  } catch (err) {
    console.error('Error in GET /events/:id', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
