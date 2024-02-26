const express = require('express')
const bodyParser = require('body-parser');//Important
const router = express.Router();

// Parse JSON bodies
router.use(bodyParser.json()); //Important

const {
    addPokemon,
    getAllPokemon,
    removePokemon
} = require('../controllers/pokemon')

router.post('/addPokemon', addPokemon)
router.get('/allPokemon', getAllPokemon)
router.delete('/removePokemon/:id', removePokemon)

module.exports = router