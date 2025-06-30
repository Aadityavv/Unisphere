const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  role: { type: String, enum: ['member', 'coordinator'], default: 'member' },
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema); 