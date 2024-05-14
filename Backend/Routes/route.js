const express = require("express");
const templatesRouter = express.Router();
const signUpRouter = express.Router();
const Templates = require("../model/Template.model");
const User = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

templatesRouter.get("/template", async (req, res) => {
  try {
    const templates = await Templates.find();
    res.status(200).json(templates);
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
      // Add a field to store verification token
      verificationToken: generateRandomToken(),
    });

    // Send verification email
    await sendVerificationEmail(newUser.userEmail, newUser.verificationToken);

    return res.status(200).json({
      message: `Welcome, ${newUser.userEmail}`,
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Route for verifying user's email
// Route for verifying user's email
signUpRouter.get("/signup/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userEmail = decodedToken.data;

    // Find the user with the provided email
    const user = await User.findOne({ userEmail });

    // Check if the user exists and if the verification token matches
    if (!user || user.verificationToken !== token) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    // Update the user's verification status in the database
    user.isVerified = true;
    user.verificationToken = undefined; // Remove the verification token
    await user.save();

    // Redirect the user to the home page with a success message
    return res.redirect("/").json({ success: true, message: "Email verified successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Function to send verification email
async function sendVerificationEmail(email, verificationToken) {
  try {
    // Create transporter using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    // Construct email message
    // Construct email message with HTML content
    const mailOptions = {
      from: "ki225ku@gmail.com",
      to: email,
      subject: "Account Verification",
      html: `
    <p>Please click the following button to verify your email address:</p>
    <a href="http://localhost:5173" style="background-color: blue; color: white; padding: 10px 15px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 10px;">Verify Email</a>
  `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    // Handle error appropriately
  }
}

module.exports = { templatesRouter, signUpRouter };
