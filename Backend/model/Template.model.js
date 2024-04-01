const mongoose = require("mongoose")

const templateSchema = new mongoose.Schema({
    templateID: {
        type: Number,
    },
    category: {
        type: String,
    },
    templateImg: {
        type: Image,
    }
})

module.exports = mongoose.model("templates", templateSchema)