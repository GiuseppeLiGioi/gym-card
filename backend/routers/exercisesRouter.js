const express = require('express')
const exercisesController = require('../controllers/exercisesController')

const router = express.Router()

router.get('/', (req, res) => {
    res.send({message: "exercises route funzionante"})
})