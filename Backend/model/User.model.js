const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userEmail: {
    type: String,
  },
  userPassword: {
    type: String,
  },
});

module.exports = mongoose.model("users", userSchema);
