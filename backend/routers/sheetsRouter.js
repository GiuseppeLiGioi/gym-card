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
router.delete('/sheetId/exercises/:exerciseId', authMiddleware, exercisesController.deleteExercise)

router.get('/:sheetId/exercises/search', authMiddleware, exercisesController.searchExercise)
router.get('/:sheetId/progress', authMiddleware, sheetsController.showProgress)
router.post('/:sheetId/duplicate', authMiddleware, sheetsController.duplicateSheet)
router.put('/:sheetId/exercises/:exerciseId/complete', authMiddleware, exercisesController.markExerciseCompleted)



module.exports = router;