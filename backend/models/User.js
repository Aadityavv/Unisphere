const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['student', 'faculty', 'admin'], default: 'student' },
    department: String,
    clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }],
});

module.exports = mongoose.model('User', userSchema);
