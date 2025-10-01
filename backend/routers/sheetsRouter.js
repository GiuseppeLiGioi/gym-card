const express = require('express')
const authMiddleware = require ('../middlewares/authMiddleware')
const exercisesController = require ('../controllers/exercisesController')
const sheetsController = require ('../controllers/sheetsController')
const router = express.Router()

router.post('/', authMiddleware, sheetsController.createSheet)
router.get('/', authMiddleware, sheetsController.showSheets)
router.put('/:id', authMiddleware, sheetsController.editSheet)
router.delete('/:id', authMiddleware, sheetsController.deleteSheet)

router.post('/:id/exercises', authMiddleware, exercisesController.createExercise)
router.get('/:id/exercises', authMiddleware, exercisesController.showExercise)
router.put('/:sheetId/exercises/:exerciseId', authMiddleware, exercisesController.editExercise)
//router.delete('/:id', authMiddleware, exercisesController.de)

module.exports = router;