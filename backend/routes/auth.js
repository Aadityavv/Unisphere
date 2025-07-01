const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const auth = require('../middleware/auth');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role, department });
    const token = generateToken(user._id);
    res.status(201).json({ token, user: { ...user.toObject(), passwordHash: undefined } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(user._id);
    res.json({ token, user: { ...user.toObject(), passwordHash: undefined } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  res.json(req.user);
});

router.get('/test', (req, res) => {
  res.json({ message: 'auth.js route is working ✅' });
});


module.exports = router; 