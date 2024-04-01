const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const { connectToDB, disconnectFromDB, isConnected } = require('./database');

// Database connection
connectToDB()

app.get( "/", (req, res) => {
    res.send("hello world <3")
})

app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
})

app.get("/", (req, res) => {
    res.send(isConnected ? "Connected" : "Disconnected");
});