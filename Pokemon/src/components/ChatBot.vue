<script setup>
import { openai } from '../config';
import { reactive, computed } from 'vue';

const props = defineProps({
    pokemonName: {
        type: String
    }
})

const user = reactive({
    input: "",
    conversation: [],
    displayChat: false,
    loading: false
})

const submit = (e) => {
    e.preventDefault()
    user.loading = true
    main(user.input)
}

const main = async (input) => {
    let conversationHistory = ""
    /* 
        This is the only way I know of holding the history of the conversation
        The only problem is that the longer the conversation the more money it will cost
     */
    user.conversation.map(data => {
       return conversationHistory = JSON.stringify(data.user + data.bot)
    })

    const response = await openai.chat.completions.create({
        model:"gpt-4",
        messages: [
          {
            role:"system",
            content:`Only reply if the user asks things about pokemon or ${props.pokemonName}, OtherWise 
            reply back saying "Sorry I only can give information about ${props.pokemonName}"
            This is the are conversation History ${conversationHistory}
            `
          },
          {
            role:"user",
            content: input + props.pokemonName
          },
        ],
        
    })
    
    user.conversation.push({ user: input }, { bot: response.choices[0].message.content });
    user.displayChat = true
    user.input = ""
    user.loading = false
}

const inputPlaceholder = computed(() => `Ask me about ${props.pokemonName}...`);
</script>

<template>
    <div class="chatBotContainer">
        <form action="" @submit.prevent="submit">
            <div>
                <input type="text" :placeholder="inputPlaceholder"  v-model="user.input" required>
                <button>Submit</button>
            </div>
        </form>
        <div class="loading" v-if="user.loading">Loading...</div>
        <div class="convo" :class="{ 'displayChat': user.displayChat, 'hideChat': !user.displayChat}">
            <p v-for="(chat) in user.conversation" :class="{ 'user-message': chat.user, 'bot-message': chat.bot }">
                <img v-if="chat.user" src="../assets/user.png" alt=""> 
                <span v-if="chat.user">{{ chat.user }}</span>
                <img  class="botImg" v-if="chat.bot" src="../assets/bot.png" alt=""> 
                <span v-if="chat.bot">{{ chat.bot }}</span>
            </p>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.chatBotContainer{
    max-width: 100%;
    width: 800px;
    margin: 0 auto 100px;
}
 form{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;

        div{
            border: solid #3B4CCA 2px;
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
            color: whitesmoke;
        }
        @media screen and (max-width: 450px){
        button{
            width: 100%;
        }
    }
    }
  div{
    p{
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 5rem;
        margin-top: 10px;
        color: whitesmoke;

        img{
            width: 30px;
        }
        .botImg{
          position: absolute;
          left: 5px;
          top: 10px;
        }
    }
    .user-message{
        padding: 10px 50px 10px 5px;
    }
    .bot-message{
        padding: 10px 50px 10px 40px;
    }
    .user-message, .bot-message {
        background-color: whitesmoke; /* Set background color for user messages */
        margin: 10px 20px 20px;
        color: black;
        border-radius: 10px;
        box-shadow:  5px 5px 10px;
        font-size: 1.2rem;
    }
    .convo{
        background-color: #FF0000;
        padding: 10px 0;
        margin: 30px 50px 200px;
        border-radius: 20px;
        border: solid black 5px;
        box-shadow: rgb(104, 100, 100)  10px 10px 10px;
    }
    @media screen and (max-width: 300px){
        .convo{
            margin: 30px 10px ;
        }
        .user-message, .bot-message{
            font-size: 1rem;
        }
    }
    .displayChat{
        display: block;
    }
    .hideChat{
        display: none;
    }
    .loading{
        color: black;
        font-weight: bold;
        font-size: 2rem;
        text-align: center;
        margin-top: 20px;
    }
  
}

</style>