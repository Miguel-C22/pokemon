<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    id:{
        type: String
    },
    getAllPokemon:{
        type: Function,
        required: true
    }
});

const removePokemon = async () => {
    console.log(props.id)
    try {
        const res = await fetch(`http://localhost:3008/api/v1/pokemon/removePokemon/${props.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            console.log(res)
            throw new Error('Failed to remove Pokemon');
        }
        // Handle success response
        props.getAllPokemon(); // Corrected this line
    } catch (error) {
        console.error('Error removing Pokemon:', error);
    }
};
</script>

<template>
    <div>
        <button @click="removePokemon">Remove</button> <!-- Corrected the function call -->
    </div>
</template>

<style lang="scss" scoped>
button{
            background-color: #FF0000;
            border: none;
            padding: 5px 20px;
            color: white;
            font-size: .75rem;
            font-weight: bold;
            border-radius: 10px;
        }
</style>