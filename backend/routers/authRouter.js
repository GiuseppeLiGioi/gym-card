const express = Require('express')
const authController = Require ('../controllers/authController')

const router = express.Router()

router.get('/',(req, res) => {
    res.send({message: "auth route funzionante"})
})

module.exports = router;
