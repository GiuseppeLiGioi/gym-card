const connection = require('../data/db')


const sheetsController = {
    createSheet: (req, res) => {
        const {title, theme} = req.body
        const userId = req.user.userId;

        if(!title){
            return res.status(404).json({error: "Il campo titolo è obbligatorio"})
        }

        const insertSheetQuery = 'INSERT INTO workout_sheets (user_id, title, theme) VALUES (?,?,?)'

        connection.query(insertSheetQuery, [userId, title, theme], (err, results) => {
            if(err) return res.status(500).json({error: err.message})
            
            res.status(201).json({
            message: "Scheda allenamento creata con successo",
            sheetId:  "Id scheda :" + results.insertId  
            })    
        })
    },

    showSheets: (req, res) => {
    const userId = req.user.userId;  

    const showQuery = 'SELECT * FROM workout_sheets WHERE user_id = ?'
    connection.query(showQuery, [userId], (err, results) => {
        if(err) return res.status(500).json({error: err.message})
            if(results.length === 0){
                return res.status(404).json({message: "Nessuna scheda trovata"})
            }

            res.status(200).json({sheets: results})
    })
    }


}

module.exports = sheetsController;