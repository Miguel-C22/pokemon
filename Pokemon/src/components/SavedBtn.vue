<script setup>
import { ref, defineProps} from 'vue';

const signedInEmail = ref(localStorage.getItem('userEmail') || '');

const props = defineProps({
    savedPokemon: {
        type: Object,
        default: () => ({}),
    },
    
});

const addPokemon = async (pokemon) => {
    const savedPokemon = {url: pokemon.url, name: pokemon.name, email: signedInEmail._value}

    try {
        const res = await fetch("https://pokemon-chi-smoky.vercel.app/api/v1/pokemon/addPokemon", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(savedPokemon),
        });
        if (!res.ok) {
            console.log(res)
            throw new Error('Failed to add Pokemon');
        }
        // Handle success response
    } catch (error) {
        console.error('Error adding Pokemon:', error);
    }
};
</script>

<template>
    <div>
        <div v-if="!signedInEmail ">
        <button disabled>Add</button>
        <p>Please sign in to add a Pokemon</p>
        </div>
        <div v-else>
        <button @click="addPokemon(props.savedPokemon)">Add</button>
        </div>
  </div>
</template>

<style lang="scss" scoped>
    div{
        
        button{
            background-color: #B3A125;
            border: none;
            padding: 15px 100px;
            color: black;
            font-size: 1rem;
            font-weight: bold;
            border-radius: 10px;
        }
        p{
            color: #CC0000;
            text-align: center;
            font-size: 1rem;
            margin-top: 10px;   
        }
    }
</style>