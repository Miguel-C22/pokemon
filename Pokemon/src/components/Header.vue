<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'

const showSignOutButton = ref(false);
const signedInEmail = ref(localStorage.getItem('userEmail') || '');

const signOut = () => {
  localStorage.removeItem('userEmail');
  signedInEmail.value = "";
};
</script>

<template>
    <div class="headerContainer">
        <h1>Pokédex</h1>
        <img src="../assets//Logo.png" alt="">
        <div class="links">
            <RouterLink to="/">Home</RouterLink>
            <span class="line"></span>
            <RouterLink to="/Saved">Saved</RouterLink>
            <span class="line"></span>
            <p v-if="!signedInEmail">
                <RouterLink to="/sign-In">sign-in</RouterLink>
            </p>
            <template v-else>
                <div class="signed-in-email" @mouseover="showSignOutButton = true" @mouseleave="showSignOutButton = false">
                    <p class="userEmail">{{ signedInEmail }}</p>
                    <button v-if="showSignOutButton" @click="signOut">Sign Out</button>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.cdnfonts.com/css/pokemon-solid');

.headerContainer {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: center;
        background-color: #f2f2f2;
        gap: 1rem;
        border-bottom: solid 5px #B3A125;

        @media screen and (max-width: 400px) {
            margin: auto 0 ;
            justify-content: center;
            align-items: center;
            padding: 10px 0;

            .links{
                padding: 0 1rem;
            }
        }
        
        img {
        width: 100px;
    }
    .links{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
    }
    a, .userEmail{
        color: black;
        text-decoration: none;
        font-size: 1.25rem;
        font-weight: bold;
    }
    .line{
        padding: 2px 1px;
        background-color: black;
    }

    h1{
        text-shadow: 2px 0 #3B4CCA, -2px 0 #3B4CCA, 0 2px #3B4CCA, 0 -2px #3B4CCA,
               1px 1px #3B4CCA, -1px -1px #3B4CCA, 1px -1px #3B4CCA, -1px 1px #3B4CCA;
        font-size: 3rem;
        color: #B3A125;
        font-family: 'Pokemon Solid', sans-serif;  
        letter-spacing: .5rem;
    }

    }

.signed-in-email {
  position: relative;
}

.signed-in-email button {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  margin-top: 5px;
  transform: translateX(-50%);
  width: 150px;
  padding: 10px 0px;
  background-color: #3B4CCA;
  color: white;
  border: none;
  border-radius: 5px;
}

.signed-in-email:hover button {
  display: inline-block;
}

</style>