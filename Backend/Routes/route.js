const express = require("express");
const templatesRouter = express.Router();
const signUpRouter = express.Router();
const Templates = require("../model/Template.model");
const User = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

templatesRouter.get("/template", async (req, res) => {
  try {
    const templates = await Templates.find();
    res.status(200).json(templates);
  } catch (err) {
    console.error("Error fetching templates:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

signUpRouter.post("/signup", async (req, res) => {
  try {
    const { userPassword, userEmail } = req.body;
    if (!userPassword || !userEmail) {
      return res.status(400).json({ Message: "Please enter all fields" });
    }
    let user = await User.findOne({ userEmail });

    if (user) {
      return res.status(400).json({ Message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    let newUser = await User.create({
      userPassword: hashedPassword,
      userEmail,
    });

    // Create JWT token
    const token = jwt.sign(
      { userEmail: newUser.userEmail },
      process.env.SECRET_KEY
    );

    // Store token in cookie
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: `Welcome, ${newUser.userEmail}`,
      user: newUser,
      token,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = { templatesRouter, signUpRouter };
