<script setup>
import SavedBtn from './SavedBtn.vue';

const props = defineProps({ 
  image: {
    type: String,
  },
  pokemonName: {
    type: String,
  },
  abilities:{
    type: Object,
    default: () => ([]),
  },
 types:{
    type: Object,
    default: () => ([]),
  },
  moves:{
    type: Object,
    default: () => ([]),
  }

});

</script>

<template>
    <div>
        <p class="pokemonName">{{ props.pokemonName.slice(0, 1).toLocaleUpperCase() + props.pokemonName.slice(1) }}</p>
        <img class="pokemonImg" :src="props.image" alt="">
        <SavedBtn :savedPokemon ="{url: props.image, name: props.pokemonName}" />
        <div class="info">
            <select name="abilities" >
                <option value="abilities">Abilities</option>
                <option v-for="(ability) in abilities" disabled> 
                {{ ability}}
                </option>
            </select>
            
            <select name="Types">
                <option value="types">Types</option>
                <option v-for="(type) in types" disabled> 
                {{ type}}
                </option>
            </select>
        
            <select name="Types">
                <option value="types">moves</option>
                <option v-for="(move) in moves" disabled> 
                {{ move }}
                </option>
            </select>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.cdnfonts.com/css/pokemon-solid');

    div{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 20px 0;

        p{
            font-family: 'Pokemon Solid', sans-serif;   
            letter-spacing: 5px;              
            font-size: 2rem;
            
        }
        img{
            max-width: 100%;
            width: 200px;
            
        }
    }

    .info{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 5rem;
        gap: 5px;
        flex-wrap: wrap;

        select{
            padding: 5px 20px 5px 5px ;
            text-align: left;
            color: white;
            
            option:disabled {
                color:whitesmoke; 
            }
        }
         
    }
    .info select:nth-child(1){
        background-color: #FF0000;
    }
    .info select:nth-child(2){
        background-color: #3B4CCA;
    }
    .info select:nth-child(3){
        background-color: #B3A125;
    }
</style>