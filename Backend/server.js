const express = require("express");
const app = express();
const cors = require("cors")
const port = process.env.PORT || 3000;
const { connectToDB, disconnectFromDB, isConnected } = require("./database");
const templatesRouter = require("./Routes/route"); 


// Database connection
connectToDB();

// Middleware
app.use(express.json());

app.use(cors())

// Routes
app.get("/", (req, res) => {
  res.send("hello world <3");
});

// Mount the templates router at the /api path
app.get("/template", templatesRouter);

app.get("/", (req, res) => {
  res.send(isConnected ? "Connected" : "Disconnected");
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
