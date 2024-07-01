const express = require("express");
const env = require("dotenv").config();
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


// Function to send verification email
async function sendVerificationEmail(email, verificationToken) {
  try {
    console.log("Sending email to:", email); // Add logging for debugging
    console.log("Using token:", verificationToken); // Add logging for debugging

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
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Account Verification",
      html: `
        <p>Please click the following button to verify your email address:</p>
        <a href="http://localhost:5173/verify-email?token=${verificationToken}" style="background-color: lightgreen; color: white; padding: 10px 15px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 8px;" target="_self">Verify Email</a>
      `,
    };
    

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully"); // Add logging for success
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Error sending verification email"); // Throw error to handle it in the calling function
  }
}

// Route for user signup
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
      verificationToken, // Store the verification token
    });

    // Send verification email
    // await sendVerificationEmail(newUser.userEmail, verificationToken);

    return res.status(200).json({
      message: `Welcome, ${newUser.userEmail}. A verification email has been sent to your email address.`,
      verificationToken, // Add this line to pass the token to the frontend
      user: newUser,
    });
  } catch (err) {
    console.error("Error during signup:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

loginRouter.post("/login", async (req, res) => {
  try {
    // Extract email and password from request body
    const { userEmail, userPassword } = req.body;

    // Check if both email and password are provided
    if (!userEmail || !userPassword) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Find user by email
    const user = await User.findOne({ userEmail });

    // If user doesn't exist, return error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare provided password with hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);

    // If passwords don't match, return error
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userEmail: user.userEmail }, process.env.SECRET_KEY, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Return token and user data
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

signUpRouter.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Log the decoded token
    console.log("Decoded token:", decoded);

    // Find user by verification token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      console.log("User not found or token expired");
      return res.status(400).send({ message: "Invalid or expired token" });
    }

    // Set isEmailVerified to true and remove the verification token
    user.isEmailVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});



module.exports = { templatesRouter, signUpRouter, loginRouter };
