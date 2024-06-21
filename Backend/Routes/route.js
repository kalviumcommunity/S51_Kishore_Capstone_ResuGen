const express = require("express");
const templatesRouter = express.Router();
const signUpRouter = express.Router();
const loginRouter = express.Router();
const Templates = require("../model/Template.model");
const User = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

templatesRouter.get("/template", async (req, res) => {
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

// Route for user signup
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

    // Generate verification token
    const verificationToken = generateRandomToken();

    // Send verification email
    await sendVerificationEmail(newUser.userEmail, verificationToken);

    // Add verification token to the user
    newUser.verificationToken = verificationToken;
    await newUser.save();

    return res.status(200).json({
      message: `Welcome, ${newUser.userEmail}`,
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

loginRouter.post("/login", async (req, res) => {
  try {
    // Extract email and password from request body
    const { userEmail, userPassword } = req.body;

    // Check if both email and password are provided
    if (!userEmail || !userPassword) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Find user by email
    const user = await User.findOne({ userEmail });

    // If user doesn't exist, return error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare provided password with hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(
      userPassword,
      user.userPassword
    );

    // If passwords don't match, return error
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userEmail: user.userEmail },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // Return token and user data
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for verifying user's email
signUpRouter.get("/waiting", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { isEmailVerified: false },
      { isEmailVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Function to send verification email
async function sendVerificationEmail(email, verificationToken) {
  try {
    // Created transporter using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    // Construct email message
    const mailOptions = {
      from: "ki225ku@gmail.com",
      to: email,
      subject: "Account Verification",
      html: `
    <p>Please click the following button to verify your email address:</p>
    <a href="http://localhost:5173/waiting" style="background-color: lightgreen; color: white; padding: 10px 15px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 8px; target="_self"">Verify Email</a>
  `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    // Handle error appropriately
  }
}

module.exports = { templatesRouter, signUpRouter, loginRouter };
