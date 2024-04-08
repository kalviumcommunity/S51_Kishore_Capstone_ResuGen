const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { connectToDB, disconnectFromDB, isConnected } = require("./database");
const templatesRouter = require("./Routes/route"); // Import the templates router


// Database connection
connectToDB();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("hello world <3");
});

// Mount the templates router at the /api path
app.use("/api", templatesRouter);

app.get("/", (req, res) => {
  res.send(isConnected ? "Connected" : "Disconnected");
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
