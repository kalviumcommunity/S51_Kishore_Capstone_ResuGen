    const mongoose = require("mongoose")

    const templateSchema = new mongoose.Schema({
        templateID: {
            type: Number,
        },
        templateImg: {
            type: String,
        }
    })

    module.exports = mongoose.model("templates", templateSchema)