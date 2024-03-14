const express = require("express")
const app = express()
const port = 3000


app.get( "/", (req, res) => {
    res.send("hello world <3")
})

app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
})