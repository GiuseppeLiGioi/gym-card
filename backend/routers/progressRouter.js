const express = require('express')
const progressController = require('../controllers/progressController')

const router = express.Router()

router.get('/', (req, res) => {
    res.send({message: "progress route funzionante"})
})

module.exports = router