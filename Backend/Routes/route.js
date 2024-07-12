const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const templatesRouter = express.Router();
const signUpRouter = express.Router();
const loginRouter = express.Router();
const reviewRouter = express.Router();

const Templates = require("../model/Template.model");
const User = require("../model/User.model");
const Review = require("../model/Review.model");

// Template routes
templatesRouter.get("/", async (req, res) => {
  try {
    const templates = await Templates.find();
    res.status(200).json({ templates });
  } catch (err) {
    console.error("Error fetching templates:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Generate a 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(email, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Account Verification - OTP",
      html: `
        <p>Your OTP for account verification is:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for 10 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Error sending OTP email");
  }
}

// Signup route
signUpRouter.post("/signup", async (req, res) => {
  try {
    const { userPassword, userEmail } = req.body;
    if (!userPassword || !userEmail) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    let user = await User.findOne({ userEmail });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    const otp = generateOtp();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    let newUser = await User.create({
      userPassword: hashedPassword,
      userEmail,
      isEmailVerified: false,
      otp,
      otpExpiry,
    });

    await sendOtpEmail(userEmail, otp);

    return res.status(200).json({
      message: `Welcome, ${newUser.userEmail}. An OTP has been sent to your email address.`,
      user: newUser,
    });
  } catch (err) {
    console.error("Error during signup:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// OTP Verification route
signUpRouter.post("/verify-otp", async (req, res) => {
  const { userEmail, otp } = req.body;

  try {
    const user = await User.findOne({ userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isEmailVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
loginRouter.post("/login", async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({ message: "Email not verified. Please verify your email to log in." });
    }

    const token = jwt.sign({ userEmail: user.userEmail }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Review routes
reviewRouter.post('/', async (req, res) => {
  const { name, comment, rating } = req.body;
  const newReview = new Review({ name, comment, rating });

  try {
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

reviewRouter.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { templatesRouter, signUpRouter, loginRouter, reviewRouter };
