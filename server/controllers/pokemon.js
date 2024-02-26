const Pokemon = require('../schema/pokemon');

const addPokemon = async (req, res) => {
    const { url, name, email } = req.body;
    try {
        const existingPokemon = await Pokemon.findOne({ name, email });
        if (existingPokemon) {
            return res.status(400).json({ error: 'Pokemon already exists in the database' });
        }
        const pokemon = await Pokemon.create({ url, name, email });
        res.status(201).json({ message: 'Pokemon added successfully', pokemon });
    } catch (error) {
        console.error('Error adding Pokemon:', error);
        res.status(500).json({ error: 'Failed to add Pokemon' });
    }
};

const getAllPokemon = async (req, res) => {
    try {
        const findAllPokemon = await Pokemon.find({})
        res.status(201).json({ message: 'Pokemon all found', findAllPokemon });
    } catch (error) {
        console.error('Error adding Pokemon:', error);
        res.status(500).json({ error: 'Failed to add Pokemon' });
    }
}

const removePokemon = async (req, res) => {
    const { id } = req.params;
    try {
        const deletePokemon = await Pokemon.findByIdAndDelete(id)
        res.status(201).json({message: 'Pokemon deleted', deletePokemon})
    } catch (error) {
        console.error('Error delete Pokemon:', error);
        res.status(500).json({ error: 'Failed to delete Pokemon' });
    }
}

module.exports = {
    addPokemon,
    getAllPokemon,
    removePokemon,
};