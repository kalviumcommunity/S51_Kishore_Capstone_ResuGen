const express = require("express");
const templatesRoute = express.Router();
const Templates = require("../model/Template.model")



templatesRoute.get("/template", async (req, res) => {
  try {
    // Simulate fetching template data from a database or external API
    const templates = await Templates.find()
    res.status(200).json(templates)
  } catch (err) {
    console.error("Error fetching templates:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = templatesRoute;
