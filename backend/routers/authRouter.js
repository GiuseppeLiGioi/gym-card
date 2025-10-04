const express = require('express')
const authController = require ('../controllers/authController')
const authMiddleware = require ('../middlewares/authMiddleware')

const router = express.Router()
router.get('/',(req, res) => {
    res.send({message: "auth route funzionante"})
})
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/auth/me', authMiddleware, authController.verifyUser);

module.exports = router;
