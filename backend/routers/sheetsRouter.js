const express = require('express')
const authMiddleware = require ('../middlewares/authMiddleware')
const sheetsController = require ('../controllers/sheetsController')
const router = express.Router()

router.post('/', authMiddleware, sheetsController.createSheet)
router.get('/', authMiddleware, sheetsController.showSheets)
router.put('/:id', authMiddleware, sheetsController.editSheet)
router.delete('/:id', authMiddleware, sheetsController.deleteSheet)

module.exports = router;