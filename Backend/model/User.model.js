const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false, 
  },
});

module.exports = mongoose.model("users", userSchema);
