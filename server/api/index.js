require('dotenv').config();
const cors = require('cors');//Important
const express = require('express')
const app = express()
app.use(cors());//Important


const connectDB = require('../db/connect')

const pokemonRouter = require('../routes/pokemon')
const authRouter = require('../routes/auth')

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/pokemon', pokemonRouter)
app.use('/', (req, res) => res.status(200).json({message: "Hello world"}))

app.use(express.json());//Important

const port = 3008

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start() 