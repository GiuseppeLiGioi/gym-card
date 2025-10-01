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
    }
}

module.exports = exercisesController;