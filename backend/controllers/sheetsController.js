const connection = require('../data/db')


const sheetsController = {
    createSheet: (req, res) => {
        const {title, theme} = req.body
        const userId = res.user.userId;

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


}

module.exports = sheetsController;