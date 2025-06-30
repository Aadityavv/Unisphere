const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dateTime: { type: Date, required: true },
  duration: { type: Number }, // in minutes
  location: { type: String },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
  approved: { type: Boolean, default: false },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema); 