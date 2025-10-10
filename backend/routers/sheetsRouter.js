
const express = require('express')
const multer = require('multer');
const path = require('path');
const authMiddleware = require ('../middlewares/authMiddleware')
const exercisesController = require ('../controllers/exercisesController')
const sheetsController = require ('../controllers/sheetsController')
const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 } // 30MB
});

router.post('/', authMiddleware, sheetsController.createSheet)
router.get('/', authMiddleware, sheetsController.showSheets)
router.put('/:id', authMiddleware, sheetsController.editSheet)
router.delete('/:id', authMiddleware, sheetsController.deleteSheet)

router.post('/:sheetId/exercises', authMiddleware, upload.single('image'), exercisesController.createExercise)
router.get('/:sheetId/exercises', authMiddleware, exercisesController.showExercise)
router.put('/:sheetId/exercises/:exerciseId', authMiddleware, upload.single('image'), exercisesController.editExercise)
router.delete('/:sheetId/exercises/:exerciseId', authMiddleware, exercisesController.deleteExercise)

router.get('/:sheetId/exercises/search', authMiddleware, exercisesController.searchExercise)
router.get('/:sheetId/progress', authMiddleware, sheetsController.showProgress)
router.post('/:sheetId/duplicate', authMiddleware, sheetsController.duplicateSheet)
router.put('/:sheetId/exercises/:exerciseId/complete', authMiddleware, exercisesController.markExerciseCompleted)



module.exports = router;