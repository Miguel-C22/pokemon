<script setup>
import { reactive } from 'vue';
import DeleteBtn from './DeleteBtn.vue';

const pokemon = reactive({
    savedPokemon:[],
    signedInEmail: localStorage.getItem('userEmail') || ''
})

let user = pokemon.signedInEmail

import { computed } from 'vue';

const filteredPokemon = computed(() => {
  if (!user) return [];
  return pokemon.savedPokemon.filter(pokemon => pokemon.email === user);
});
/*
This line creates a reactive computed property called filteredPokemon, 
which filters the pokemon.savedPokemon array based on the current user's email, 
returning an empty array if there's no user.
*/

const getAllPokemon = async () => {
    try {
        const res = await fetch("https://pokemon-chi-smoky.vercel.app/api/v1/pokemon/allPokemon", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            console.log(res)
            throw new Error('Failed to add Pokemon');
        }
        const data = await res.json(); 
        pokemon.savedPokemon.splice(0, pokemon.savedPokemon.length, ...data.findAllPokemon); /*
        The line pokemon.savedPokemon.splice(0, pokemon.savedPokemon.length, ...data.findAllPokemon); 
        updates the pokemon.savedPokemon array with the most recent data fetched from the server by 
        clearing the array and replacing its contents with the new data.
        */
        return data; 
    } catch (error) {
        console.error('Error adding Pokemon:', error);
    }
};

getAllPokemon()
</script>

<template>
  <div>
    <div class="pokemonContainer" v-if="user">
      <div v-for="pokemon in filteredPokemon" :key="pokemon._id">
        <img class="pokemonImg" :src="pokemon.url" :alt="pokemon.name" />
        <p class="pokemonName">{{ pokemon.name }}</p>
        <DeleteBtn :id="pokemon._id" :getAllPokemon="getAllPokemon"/>
      </div>
    </div>
    <div v-else>
      <p class="signInMsg">Please sign in to view your Pokedex</p>
    </div>
  </div>
    
  </template>

<style lang="scss" scoped>
    .pokemonContainer{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        text-align: center;
        gap: 100px;
        margin-top: 100px;

        img{
            width: 120px;
        }
        p{
            margin: 20px 0;
            font-size: 1.25rem;
            font-weight: bold;
        }
    }

    .signInMsg{
        color: #CC0000;
        text-align: center;
        font-size: 2rem;
        margin-top: 50px;   
    }
</style>