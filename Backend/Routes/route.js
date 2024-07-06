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

function generateRandomToken() {
  const token = jwt.sign(
    { data: "verificationToken" },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
  return token;
}

async function sendVerificationEmail(email, verificationToken) {
  try {
    console.log("Sending email to:", email);
    console.log("Using token:", verificationToken);

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
      subject: "Account Verification",
      html: `
        <p>Please click the following button to verify your email address:</p>
        <a href="http://localhost:5173/verify-email?token=${verificationToken}" style="background-color: lightgreen; color: white; padding: 10px 15px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 8px;" target="_self">Verify Email</a>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Error sending verification email");
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

    const verificationToken = generateRandomToken();

    let newUser = await User.create({
      userPassword: hashedPassword,
      userEmail,
      isEmailVerified: false,
      verificationToken,
    });

    await sendVerificationEmail(userEmail, verificationToken);

    return res.status(200).json({
      message: `Welcome, ${newUser.userEmail}. A verification email has been sent to your email address.`,
      verificationToken,
      user: newUser,
    });
  } catch (err) {
    console.error("Error during signup:", err);
    return res.status(500).json({ success: false, message: err.message });
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

    const token = jwt.sign({ userEmail: user.userEmail }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Email verification route
signUpRouter.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log("Decoded token:", decoded);

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      console.log("User not found or token expired");
      return res.status(400).send({ message: "Invalid or expired token" });
    }

    user.isEmailVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send({ message: "Internal server error" });
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
