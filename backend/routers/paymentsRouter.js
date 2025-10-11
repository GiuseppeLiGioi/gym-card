const express = require('express')
const authMiddleware = require ('../middlewares/authMiddleware')
const paymentsController = require('../controllers/paymentsController')
const router = express.Router()


router.post('/create', authMiddleware, paymentsController.createPayment)

module.exports = router;