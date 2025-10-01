const express = require('express')
const authMiddleware = require ('../middlewares/authMiddleware')
const exercisesController = require('../controllers/exercisesController')

const router = express.Router()

router.post('/', authMiddleware, exercisesController.createExercise)
router.get('/', authMiddleware, exercisesController.showExercise)

module.exports = router