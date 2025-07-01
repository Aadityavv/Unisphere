const express = require('express');
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const { getFacultyDashboard } = require('../controllers/facultyController');

const router = express.Router();

// Create event (faculty/coordinator)
router.post('/create', auth, requireRole('faculty'), async (req, res) => {
  try {
    const { title, description, dateTime, duration, location, clubId } = req.body;
    const event = await Event.create({
      title, description, dateTime, duration, location, clubId,
      organizerId: req.user._id,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all events (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { club, category, date } = req.query;
    let filter = {};
    if (club) filter.clubId = club;
    if (date) filter.dateTime = { $gte: new Date(date) };
    // category can be added if category field exists
    const events = await Event.find(filter).populate('clubId organizerId');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get event by id
router.get('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('clubId organizerId').lean();
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check if logged-in user is a student who registered for this event
    const registration = await Registration.findOne({
      userId: req.user._id,
      eventId: req.params.id
    });

    // Add dynamic field
    event.registered = !!registration;

    res.json(event);
  } catch (err) {
    console.error('Error in GET /events/:id', err);
    res.status(500).json({ message: err.message });
  }
});


// Get events for a student (registered)
router.get('/student/:userId', auth, async (req, res) => {
  try {
    const regs = await Registration.find({ userId: req.params.userId }).populate('eventId');
    res.json(regs.map(r => r.eventId));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit event (faculty/coordinator)
router.put('/:id', auth, requireRole('faculty'), async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/faculty/dashboard', auth, requireRole('faculty'), getFacultyDashboard);

module.exports = router; 