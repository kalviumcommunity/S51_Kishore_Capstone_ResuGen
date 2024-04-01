const mongoose = require("mongoose")

const  userSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    } 
    
})

module.exports = mongoose.model("users", userSchema)