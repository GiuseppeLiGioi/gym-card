const express = Require('express')
const sheetsController = Require ('../controllers/sheetsController')

const router = express.Router()

router.get('/',(req, res) => {
    res.send({message: "Sheets route funzionante"})
})

module.exports = router;