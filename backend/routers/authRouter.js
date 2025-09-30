const express = require('express')
const authController = require ('../controllers/authController')

const router = express.Router()

router.get('/',(req, res) => {
    res.send({message: "auth route funzionante"})
})

module.exports = router;
