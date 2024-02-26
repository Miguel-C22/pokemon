<script setup>
import { reactive } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
const userInfo = reactive({
  email:"",
  password:"",
})


const router = useRouter();

const createAccount = async () => {
    const info = {email: userInfo.email, password: userInfo.password}
    console.log(info)
    try {
        const res = await fetch("http://localhost:3008/api/v1/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        });
        if (!res.ok) {
            console.log(res)
            throw new Error('Failed sign in');
        }
        // Handle success response
        localStorage.setItem('userEmail', userInfo.email);
        userInfo.email = ""
        userInfo.password = ""
        router.push('/'); 
    } catch (error) {
        console.error('Error sign in', error);
        prompt("Failed to Sign In. Please check email or password otherwise create an account")
    }
};
</script>

<template>
    <div>
        <img src="../assets/pokedex.webp" alt="">
        <form @submit.prevent="createAccount" action="">
            <input type="email" name="email" id="" placeholder="email..."  v-model="userInfo.email" required>
            <input type="text" name="password" placeholder="Password..." v-model="userInfo.password" required>
            <button>Sign-In</button>
        </form>
    <RouterLink to="/sign-up">Create Account</RouterLink>
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