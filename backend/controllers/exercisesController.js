const connection = require('../data/db');
const exercisesController = {

    createExercise: (req, res) => {
        const { sheet_id, name, sets, reps, weight, image } = req.body
        const userId = req.user.userId

        if (!sheet_id || !name || !sets || !reps) {
            return res.status(404).json({ message: "I campi idScheda, nome, serie e ripetizioni sono obbligatori" })
        }

        const verifySheetUserQuery = 'SELECT * FROM workout_sheets WHERE id = ? AND user_id = ?'
        connection.query(verifySheetUserQuery, [sheet_id, userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) return res.status(404).json({ message: "Nessuna scheda allenamento trovata associata al tuo Id" })

            const createQuery = 'INSERT INTO exercises (sheet_id, name, sets, reps, weight, image) VALUES (?,?,?,?,?, ?)'
            connection.query(createQuery, [sheet_id, name, sets, reps, weight, image], (err, results) => {
                if (err) return res.status(500).json({ error: err.message })
                if (results.affectedRows === 0) return res.status(404).json({ message: "Non è stato possibile aggiungere l'esercizio" })

                res.status(200).json({
                    idExercise: results.insertId,
                    message: "Esercizio aggiunto correttamente"
                })
            })
        })
    },

    showExercise: (req, res) => {
        const userId = req.user.userId
        const sheetId = req.params.id

        const verifySheetUserQuery = 'SELECT * FROM workout_sheets WHERE id = ? AND user_id = ?'
        connection.query(verifySheetUserQuery, [sheetId, userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) return res.status(404).json({ message: "Nessuna scheda allenamento trovata associata al tuo Id" })

            const showExercisesQuery = 'SELECT * FROM exercises WHERE sheet_id = ?'
            connection.query(showExercisesQuery, [sheetId], (err, results) => {
                if (err) return res.status(500).json({ error: err.message })
                if (results.length === 0) return res.status(404).json({ message: "Non è stato possibile mostrare gli esercizi" })

                res.status(200).json({ exercises: results })
            })
        })
    },


    editExercise: (req, res) => {
        const userId = req.user.userId
        const exerciseId = req.params.id
        const { name, sets, reps, weight, image } = req.body

        if (!name || !sets || !reps) {
            return res.status(404).json({ message: "I campi idScheda, nome, serie e ripetizioni sono obbligatori" })
        }

        const showExercisesQuery = 'SELECT * FROM exercises WHERE id = ?'
        connection.query(showExercisesQuery, [exerciseId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) return res.status(404).json({ message: "Nessun esercizio trovato" })

            const sheetId = results[0].sheet_id;

            const verifySheetUserQuery = 'SELECT * FROM workout_sheets WHERE id = ? AND user_id = ?'
            connection.query(verifySheetUserQuery, [sheetId, userId], (err, results) => {
                if (err) return res.status(500).json({ error: err.message })

                const updateQuery = 'UPDATE exercises SET name = ?, sets = ?, reps = ?, weight = ?, image = ? WHERE id = ?'
                connection.query(updateQuery, [name, sets, reps, weight, image, exerciseId], (err, results) => {
                    if (err) return res.status(500).json({ error: err.message })
                    if (results.affectedRows === 0) return res.status(404).json({ message: "Non è stato possibile modificare l'esercizio" })

                    res.status(200).json({ message: "esercizio aggiornato con successo" })
                })
            })
        })
    },

    deleteExercise: (req, res) => {
        const userId = req.user.userId
        const exerciseId = req.params.id
        const verifyExerciseQuery = ` SELECT e.* FROM exercises e JOIN workout_sheets w ON e.sheet_id = w.id  WHERE e.id = ? AND w.user_id = ?`;
        connection.query(verifyExerciseQuery, [exerciseId, userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: "Esercizio non trovato o non appartiene all'utente" });

            const deleteQuery = 'DELETE FROM exercises WHERE id = ?';
            connection.query(deleteQuery, [exerciseId], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                if (results.affectedRows === 0) return res.status(404).json({ message: "Non è stato possibile eliminare l'esercizio" });

                res.status(200).json({ message: "Esercizio eliminato con successo" });
            });
        });
    }
}

module.exports = exercisesController;