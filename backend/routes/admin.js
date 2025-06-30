const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/role');

const router = express.Router();

// Get pending events
router.get('/events/pending', auth, requireRole('admin'), async (req, res) => {
  try {
    const events = await Event.find({ approved: false });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve event
router.post('/events/:id/approve', auth, requireRole('admin'), async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reject event
router.post('/events/:id/reject', auth, requireRole('admin'), async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event rejected and deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users
router.get('/users', auth, requireRole('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Change user role
router.patch('/users/:id/role', auth, requireRole('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Engagement heatmap (stub)
router.get('/engagement-heatmap', auth, requireRole('admin'), async (req, res) => {
  // TODO: Implement analytics
  res.json({ message: 'Engagement heatmap analytics coming soon' });
});

// Event stats (stub)
router.get('/event-stats', auth, requireRole('admin'), async (req, res) => {
  // TODO: Implement event stats
  res.json({ message: 'Event stats analytics coming soon' });
});

module.exports = router; 