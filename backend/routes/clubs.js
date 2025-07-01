const express = require('express');
const Club = require('../models/Club');
const Membership = require('../models/Membership');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/role');

const router = express.Router();

// Get all clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create club (faculty/coordinator)
router.post('/create', auth, requireRole('faculty'), async (req, res) => {
  try {
    const { name, description, facultyLeadId } = req.body;
    const club = await Club.create({ name, description, facultyLeadId, createdBy: req.user._id });
    res.status(201).json(club);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get club by id
router.get('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.json(club);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get club members
router.get('/:id/members', async (req, res) => {
  try {
    const members = await Membership.find({ clubId: req.params.id }).populate('userId');
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Join club (student)
router.post('/:id/join', auth, requireRole('student'), async (req, res) => {
  try {
    const exists = await Membership.findOne({ userId: req.user._id, clubId: req.params.id });
    if (exists) return res.status(400).json({ message: 'Already a member' });
    const membership = await Membership.create({ userId: req.user._id, clubId: req.params.id });
    res.status(201).json(membership);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/club/:clubId', async (req, res) => {
  try {
    const events = await Event.find({ clubId: req.params.clubId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 