<script setup>
import { reactive } from 'vue';
import PokemonDisplayed from './DisplayPokemon.vue'
import ChatBot from './ChatBot.vue';
const pokemon = reactive({
    pokemonName: "",
    failed: null,
    errMsg: "",
    displayName: "",
    img: "",
    description: "",
    abilities: [],
    types: [],
    moves: [],
    displayInfo: false
})

const searchPokemon = async (e) => {
    try {
    if(pokemon.pokemonName){
        await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemonName.toLowerCase()}`)
        .then(res => res.json())
        .then((data) => {
            pokemon.displayInfo = true
            pokemon.abilities = [];
            pokemon.types =[]
            pokemon.moves=[]
        
            data.abilities.forEach(ability => {pokemon.abilities.push(ability.ability.name)});
            data.types.forEach(types => {pokemon.types.push(types.type.name)});
            data.moves.forEach(move => {pokemon.moves.push(move.move.name)});
            pokemon.displayName = data.name
            pokemon.img = data.sprites.other.showdown.front_default
        }) 
        pokemon.failed = null
    }
    } catch (error) {
        pokemon.errMsg = `Please Enter in a valid pokemon name`
        pokemon.failed = true
    }
}
</script>

<template>
    <div>
        <form action="" @submit.prevent="searchPokemon">
            <div :class="{'goodRes' : !pokemon.failed, 'badRes': pokemon.failed}">
                <input type="text" placeholder="Search Pokemon..." v-model="pokemon.pokemonName" required>
                <button>Search</button>
            </div>
        </form>
        
        <p class="errMsg" v-show="pokemon.failed">{{ pokemon.errMsg }}</p>

        <p class="welcomeMsg" :class="{'displayInfo' : !pokemon.displayInfo, 
        'hidInfo': pokemon.displayInfo}">
            Welcome, Trainer!
            <br>
            🔍 Search for your favorite Pokémon! 🔍
        </p>

        <div :class="{'hidInfo' : !pokemon.displayInfo, 'displayInfo': pokemon.displayInfo}">
            <PokemonDisplayed 
            :image="pokemon.img"
            :pokemonName="pokemon.displayName"
            :abilities="pokemon.abilities"
            :types="pokemon.types"
            :moves="pokemon.moves"
            />

            <ChatBot 
            :pokemonName="pokemon.displayName"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    form{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
        
        .goodRes{
            border: solid #3B4CCA 2px;
        }
        .badRes{
            border: solid #CC0000 2px;
        }

        input:focus {
            outline: none; 
            border: none; 
        }

        input{
            padding: 15px 50px 15px 10px;
            border: none;
            font-size: 1.1rem;
        }

        button{
            border: none;
            padding: 15px 30px;
            font-size: 1.1rem;
            background-color: #3B4CCA;
            color: white;
        }
    }
    @media screen and (max-width: 450px){
        button{
            width: 100%;
        }
    }
    .errMsg{
        color: #CC0000;
        text-align: center;
        font-size: .75rem;
        margin-top: 10px;
        }

    .welcomeMsg{
        text-align: center;
        font-size: 2em;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        margin-top: 5rem;
    }
    .displayInfo{
        display: block;
    }
    .hidInfo{
        display: none;
    }

</style>