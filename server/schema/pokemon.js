const mongoose = require('mongoose')

const pokemonSchema = new mongoose.Schema({
    url: String,
    name: String,
    email: String,
})

module.exports = mongoose.model("Pokemon", pokemonSchema)