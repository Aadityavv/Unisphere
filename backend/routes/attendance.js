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

// Get attendance by event
router.get('/event/:eventId', auth, async (req, res) => {
  try {
    const records = await Attendance.find({ eventId: req.params.eventId }).populate('userId');
    res.json(records);
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

module.exports = router; 