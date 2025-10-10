const connection = require('../data/db');
const exercisesController = {

    createExercise: (req, res) => {
        const { sheet_id, name, sets, reps, weight, image_url } = req.body;
        const userId = req.user.userId;
        const image = req.file ? req.file.filename : image_url || null;

        if (!sheet_id || !name || !sets || !reps)
            return res.status(400).json({ message: "Campi obbligatori mancanti" });

        const imagePath = image ? `/uploads/${image}` : null;

        // Inserimento DB
        const createQuery = 'INSERT INTO exercises (sheet_id, name, sets, reps, weight, image) VALUES (?,?,?,?,?,?)';
        connection.query(createQuery, [sheet_id, name, sets, reps, weight, image], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({
                id: results.insertId,
                name,
                sets,
                reps,
                weight,
                image: imagePath,
                message: "Esercizio aggiunto correttamente"
            });
        });
    },

    editExercise: (req, res) => {
        const { name, sets, reps, weight, image_url } = req.body;
        const exerciseId = req.params.exerciseId;
        const image = req.file ? req.file.filename : image_url || null;
        const imagePath = image ? `/uploads/${image}` : null;

        const updateQuery = 'UPDATE exercises SET name=?, sets=?, reps=?, weight=?, image=? WHERE id=?';
        connection.query(updateQuery, [name, sets, reps, weight, image, exerciseId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({
                id: exerciseId,
                name,
                sets,
                reps,
                weight,
                image: imagePath,
                message: "Esercizio modificato correttamente"
            });
        });
    },



    showExercise: (req, res) => {
        const userId = req.user.userId
        const sheetId = req.params.sheetId

        const verifySheetUserQuery = 'SELECT * FROM workout_sheets WHERE id = ? AND user_id = ?'
        connection.query(verifySheetUserQuery, [sheetId, userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) return res.status(404).json({ message: "Nessuna esercizio trovato associato al tuo id" })

            const showExercisesQuery = 'SELECT * FROM exercises WHERE sheet_id = ?'
            connection.query(showExercisesQuery, [sheetId], (err, results) => {
                if (err) return res.status(500).json({ error: err.message })

                res.status(200).json({ exercises: results })
            })
        })
    },




    deleteExercise: (req, res) => {
        const userId = req.user.userId
        const exerciseId = req.params.exerciseId
        const sheetId = req.params.sheetId
        const verifyExerciseQuery = ` SELECT e.* FROM exercises e JOIN workout_sheets w ON e.sheet_id = w.id  WHERE e.id = ? AND e.sheet_id = ? AND w.user_id = ?`;
        connection.query(verifyExerciseQuery, [exerciseId, sheetId, userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: "Esercizio non trovato o non appartiene all'utente" });

            const deleteQuery = 'DELETE FROM exercises WHERE id = ?';
            connection.query(deleteQuery, [exerciseId], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                if (results.affectedRows === 0) return res.status(404).json({ message: "Non è stato possibile eliminare l'esercizio" });

                res.status(200).json({ id: exerciseId, message: "Esercizio eliminato con successo" });
            });
        });
    },

    searchExercise: (req, res) => {

        const sheetId = req.params.sheetId
        const userInput = req.query.name
        const userId = req.user.userId

        const verifySheetUserQuery = 'SELECT * FROM workout_sheets WHERE id = ? AND user_id = ?'
        connection.query(verifySheetUserQuery, [sheetId, userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) return res.status(404).json({ message: "Scheda non trovata o non appartenente all'utente" })

            const searchExerciseQuery = 'SELECT * FROM exercises WHERE sheet_id = ? AND name LIKE ?'
            const searchValue = `%${userInput}%`
            connection.query(searchExerciseQuery, [sheetId, searchValue], (err, results) => {
                if (err) return res.status(500).json({ error: err.message })
                if (results.length === 0) return res.status(404).json({ message: "Nessun esercizio trovato con questo nome" })

                res.status(200).json({ exercises: results })
            })
        })

    },

    markExerciseCompleted: (req, res) => {
        const exerciseId = req.params.exerciseId
        const userId = req.user.userId

        const verifySheetUserQuery = 'SELECT e.*, w.user_id FROM exercises e JOIN workout_sheets w ON e.sheet_id = w.id WHERE e.id = ? AND user_id = ?'
        connection.query(verifySheetUserQuery, [exerciseId, userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) return res.status(404).json({ message: "Esercizio non trovato o non appartenente all'utente" })

            const completed = true;

            const updateCompletedExercise = 'UPDATE exercises SET completed = ? WHERE id = ?'
            connection.query(updateCompletedExercise, [completed, exerciseId], (err, results) => {
                if (err) return res.status(500).json({ error: err.message })
                if (results.affectedRows === 0) return res.status(404).json({ message: "Non è stato possibile marcare l'esercizio come completato" })

                res.status(200).json({
                    message: "Esercizio Completato",
                    completed: completed
                })
            })
        })

    }
}

module.exports = exercisesController;