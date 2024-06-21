const express = require("express");
require("dotenv").config();
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
const port = process.env.PORT || 3000;
const { connectToDB } = require("./database");
const { templatesRouter, signUpRouter, loginRouter } = require("./Routes/route");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

connectToDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("hello world <3");
});

async function generateResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  return text.replace(/[*#_]/g, ''); 
}

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const prompt = `User asked: ${message}`;
    const response = await generateResponse(prompt);
    res.json({ response });
  } catch (error) {
    console.error("Error generating chat response:", error);
    res.status(500).json({ error: "Failed to generate chat response" });
  }
});

app.post("/work-summary", async (req, res) => {
  try {
    const { experience } = req.body;
    let experienceDetails = experience.map(exp => 
      `Company: ${exp.company}, Position: ${exp.position}, StartDate: ${exp.startDate}, EndDate: ${exp.endDate}`
    ).join("; ");
    const prompt = `Generate a work summary based on the following experience details: ${experienceDetails}`;
    const summary = await generateSummary(prompt);
    res.json({ summary });
  } catch (error) {
    console.error("Error generating work summary:", error);
    res.status(500).json({ error: "Failed to generate work summary" });
  }
});

app.use("/template", templatesRouter);
app.use("/", signUpRouter);
app.use("/", loginRouter);

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
