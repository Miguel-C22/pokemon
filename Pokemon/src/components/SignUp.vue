<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const userInfo = reactive({
  email:"",
  password:"",
  confirmPass:""
})


const createAccount = async () => {
    const info = {email: userInfo.email, password: userInfo.password}
    console.log(info)
    if(userInfo.password === userInfo.confirmPass){
      try {
        const res = await fetch("https://pokemon-chi-smoky.vercel.app/api/v1/auth/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        });
        if (!res.ok) {
            console.log(res)
            throw new Error('Failed to create user');
        }
        // Handle success response
        localStorage.setItem('userEmail', userInfo.email);
        userInfo.email = ""
        userInfo.password = ""
        userInfo.confirmPass = ""
        router.push('/sign-In');
    } catch (error) {
        console.error('Error creating user:', error);
    }
    }else{
      prompt("password did not match", "Password needs to match")
    }
    
};
</script>

<template>
  <div>
    <img src="../assets/pokedex.webp" alt="">
    <form @submit.prevent="createAccount" action="">
        <input type="email" name="email" id="" placeholder="email"  v-model="userInfo.email" required>
        <input type="text" name="password" placeholder="create Password" v-model="userInfo.password" required>
        <input type="text" name="password" placeholder="confirm Password" v-model="userInfo.confirmPass" required>
        <button>Create Account</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin: 200px 20px 0;
  }
  img {
    max-width: 100%;
    width: 400px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 100%;
    width: 300px;

    input {
     padding: 10px 0px 10px 5px;
    }

    button{
      background-color: #B3A125;
      border: none;
      padding: 15px 0;
      color: black;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 10px;
    }
  }
</style>