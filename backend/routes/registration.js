const express = require('express');
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const generateQRCode = require('../utils/generateQRCode');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/role');

const router = express.Router();

// Register for event (student)
router.post('/events/:id/register', auth, requireRole('student'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    const exists = await Registration.findOne({ userId: req.user._id, eventId: event._id });
    if (exists) return res.status(400).json({ message: 'Already registered' });
    const qrData = `${req.user._id}:${event._id}:${Date.now()}`;
    const qrCode = await generateQRCode(qrData);
    const reg = await Registration.create({ userId: req.user._id, eventId: event._id, qrCode });
    res.status(201).json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get registrations for event (faculty)
router.get('/events/:id/registrations', auth, requireRole('faculty'), async (req, res) => {
  try {
    const regs = await Registration.find({ eventId: req.params.id }).populate('userId');
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get registrations for user (student)
router.get('/users/:id/registrations', auth, requireRole('student'), async (req, res) => {
  try {
    const regs = await Registration.find({ userId: req.params.id }).populate('eventId');
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 