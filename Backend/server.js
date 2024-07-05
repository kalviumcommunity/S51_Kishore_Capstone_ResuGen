const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { connectToDB } = require("./database");
const {
  templatesRouter,
  signUpRouter,
  loginRouter,
  reviewRouter,
} = require("./Routes/route");

const app = express();
const port = process.env.PORT || 3000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

connectToDB(); // Connect to MongoDB

// Middleware
app.use(express.json());
app.use(bodyParser.json());
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
  return text.replace(/[*#_]/g, "");
}

async function generateSummary(experienceDetails, skills) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Generate a work summary based on the following experience details and skills:
Experience:
${experienceDetails}
Skills:
${skills.join(', ')}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  return text.replace(/[*#_]/g, "").split('\n').filter(summary => summary.trim() !== "");
}

app.post("/chat", async (req, res) => {
  try {
    const { message, experience, skills } = req.body;

    if (message.toLowerCase() === "give me some tips" && experience && skills) {
      const experienceDetails = experience
        .map(
          (exp) =>
            `Company: ${exp.company}, Position: ${exp.position}, StartDate: ${exp.startDate}, EndDate: ${exp.endDate}`
        )
        .join("; ");
      const summaries = await generateSummary(experienceDetails, skills);
      res.json({ response: summaries.join('\n') });
    } else {
      const prompt = `User asked: ${message}`;
      const response = await generateResponse(prompt);
      res.json({ response });
    }
  } catch (error) {
    console.error("Error generating chat response:", error);
    res.status(500).json({ error: "Failed to generate chat response" });
  }
});

app.use("/template", templatesRouter);
app.use('/reviews', reviewRouter);
app.use("/", signUpRouter);
app.use("/", loginRouter);

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
