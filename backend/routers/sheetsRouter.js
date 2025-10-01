const express = require('express')
const sheetsController = require ('../controllers/sheetsController')
const router = express.Router()

router.post('/', sheetsController.createSheet)

module.exports = router;