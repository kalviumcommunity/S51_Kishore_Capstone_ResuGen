const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  userPassword: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiry: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
