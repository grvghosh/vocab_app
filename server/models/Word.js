const mongoose = require('mongoose')
const wordSchema = new mongoose.Schema({
    word: { type: String, unique: true },
    entries: [{
        partOfSpeech: { type: String },
        origin: [{ type: String }],
        definitions: [{ type: String }],
        examples: [{ type: String }]
    }]
})

module.exports = mongoose.model('Word', wordSchema)
