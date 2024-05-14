const express = require("express");
require("dotenv").config()
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
const port = process.env.PORT || 3000;
const { connectToDB } = require("./database");
const {templatesRouter, signUpRouter} = require("./Routes/route"); 
// const userRouter = require("./Routes/route")
const nodemailer = require('nodemailer')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Database connection
connectToDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("hello world <3");
});

async function generateSummary(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  return text;
}

app.post("/summary", async (req, res) => {
  try {
    const { firstName, lastName, jobTitle, country, state } = req.body;
    const prompt = `Write a summary for the given inputs: Name: ${firstName} ${lastName}, Job Title: ${jobTitle}, Country: ${country}, State: ${state}`;
    const summary = await generateSummary(prompt);
    res.json({ summary });
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

// Mount the templates router at the /api path
app.use("/template", templatesRouter);
app.use("/", signUpRouter);
// app.use("/signup", userRouter)

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
