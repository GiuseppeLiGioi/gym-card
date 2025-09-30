const express = require('express')
const sheetsController = require ('../controllers/sheetsController')

const router = express.Router()

router.get('/',(req, res) => {
    res.send({message: "Sheets route funzionante"})
})

module.exports = router;