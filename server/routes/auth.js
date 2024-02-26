const express = require('express')
const bodyParser = require('body-parser');//Important
const router = express.Router();

// Parse JSON bodies
router.use(bodyParser.json()); //Important

const {
    login, 
    register,
    getSingleUser,
    updatePassword
} = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/getSingleUser/:userId', getSingleUser)
router.patch('/updatePassword/:userId', updatePassword)

module.exports = router 
