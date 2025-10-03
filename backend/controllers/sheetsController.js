const connection = require('../data/db')


const sheetsController = {
    createSheet: (req, res) => {
        const { title, theme } = req.body
        const userId = req.user.userId;

        if (!title) {
            return res.status(404).json({ error: "Il campo titolo è obbligatorio" })
        }

        const insertSheetQuery = 'INSERT INTO workout_sheets (user_id, title, theme) VALUES (?,?,?)'

        connection.query(insertSheetQuery, [userId, title, theme], (err, results) => {
            if (err) return res.status(500).json({ error: err.message })

            res.status(201).json({
                message: "Scheda allenamento creata con successo",
                sheetId: "Id scheda :" + results.insertId
            })
        })
    },

    showSheets: (req, res) => {
        const userId = req.user.userId;

        const showQuery = 'SELECT * FROM workout_sheets WHERE user_id = ?'
        connection.query(showQuery, [userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) {
                return res.status(404).json({ message: "Nessuna scheda trovata" })
            }

            res.status(200).json({ sheets: results })
        })
    },

    editSheet: (req, res) => {
        const userId = req.user.userId;
        const { title, theme } = req.body;

        const idSheet = req.params.id

        const updateQuery = 'UPDATE workout_sheets SET title = ?, theme = ? WHERE id = ? AND user_id = ?'
        connection.query(updateQuery, [title, theme, idSheet, userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Non è stato possibile modificare la scheda" })
            }


            res.status(200).json({ message: "scheda aggiornata con successo" })
        })
    },


    deleteSheet: (req, res) => {
        const userId = req.user.userId;
        const idSheet = req.params.id

        const deleteQuery = 'DELETE FROM workout_sheets WHERE id = ? AND user_id = ?'
        connection.query(deleteQuery, [idSheet, userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Non è stato possibile eliminare la scheda" })
            }


            res.status(200).json({ message: "scheda eliminata con successo" })
        })
    },


    duplicateSheet: (req, res) => {
        const userId = req.user.userId;
        const sheetId = req.params.sheetId

        const verifySheetUserQuery = 'SELECT * FROM workout_sheets WHERE id = ? AND user_id = ?'
        connection.query(verifySheetUserQuery, [sheetId, userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) {
                return res.status(404).json({ message: "Nessuna scheda di allenamento associata" })
            }
            const newRow = { title: results[0].title, theme: results[0].theme, user_id: userId }

            const insertiNewSheet = 'INSERT INTO workout_sheets SET title = ?, theme = ?, user_id = ?'
            connection.query(insertiNewSheet, [newRow.title, newRow.theme, newRow.user_id], (err, results) => {
                if (err) return res.status(500).json({ error: err.message })
                if (results.affectedRows === 0) {
                    return res.status(404).json({ message: "Non è stato possibile duplicare i campi della scheda" })
                }
                const idNewSheet = results.insertId

                const oldExercisesQuery = 'SELECT * FROM exercises WHERE sheet_id = ?'
                connection.query(oldExercisesQuery, [sheetId], (err, results) => {
                    if (err) return res.status(500).json({ error: err.message })
                    if (results.length === 0) {
                        return res.status(404).json({ message: "Non è stato possibile recuperare i vecchi esercizi" })
                    }
                    const exercisesOriginal = results;

                    const insertPromises = exercisesOriginal.map(exercise => {
                        return new Promise((resolve, reject) => {
                            const insertNewExerciseQuery = 'INSERT INTO exercises (sheet_id, name, sets, reps, weight, image) VALUES (?,?,?,?,?,?)';
                            connection.query(
                                insertNewExerciseQuery,
                                [idNewSheet, exercise.name, exercise.sets, exercise.reps, exercise.weight, exercise.image],
                                (err, results) => {
                                    if (err) return reject(err);
                                    resolve(results);
                                }
                            );
                        });
                    });

                    
                    Promise.all(insertPromises)
                        .then(insertResults => {
                            res.status(200).json({
                                message: "Esercizi duplicati correttamente",
                                idNewSheet: idNewSheet,
                                duplicateExercises: insertResults.length
                            });
                        })
                        .catch(err => {
                            res.status(500).json({ error: err.message });
                        });
                })
            })
        })
    },

     showProgress: (req, res) => {
        const userId = req.user.userId;
        const idSheet = req.params.sheetId

        const verifySheetUserQuery = 'SELECT * FROM workout_sheets WHERE id = ? AND user_id = ?'
        connection.query(verifySheetUserQuery, [idSheet, userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) {
                return res.status(404).json({ message: "Nessuna scheda trovata o non associata all'id utente" })
            }

        const countExercisesQuery = 'SELECT COUNT(*) AS total FROM exercises WHERE sheet_id = ?'
         connection.query(countExercisesQuery, [idSheet], (err, results) => {
          if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) {
                return res.status(404).json({ message: "Non è stato possibile eseguire il conteggio degli esercizi" })
            }
            const total = results[0].total


            const countCompletedExercisesQuery = 'SELECT COUNT(*) AS completed FROM exercises WHERE sheet_id = ? AND completed = 1'
            connection.query(countCompletedExercisesQuery, [idSheet], (err, results) => {
                 if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) {
                return res.status(404).json({ message: "Non è stato possibile eseguire il conteggio degli esercizi completati" })
            }
            const totalCompleted = results[0].completed

            res.status(200).json({
            totalExercises: total,
            totalCompleted: totalCompleted,
            progress: total > 0 ? `${Math.round((totalCompleted / total) * 100)}%` : "0%"
            })
            })
         })           
        })
    }

    


}

module.exports = sheetsController;