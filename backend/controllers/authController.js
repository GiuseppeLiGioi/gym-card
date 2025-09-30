const connection = require('../data/db');
const bcrypt = require('bcryptjs');

const authController = {
    register: (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
    return res.status(400).json({error: "tutti i campi sono obbligatori"})
    }
     //verifico le email
    const verifyEmailQuery = 'SELECT * FROM user WHERE id = ?'
    connection.query(verifyEmailQuery, [email], (err, results) => {
    if(err) return res.status(500).json({error: err.message});

    if(results.length > 0){
        return res.status(404).json({message: "Email già registrata"})
    }
    //hash password: rendo crtptata la password
    const hashedPassword = bcrypt.hashSync(password)
    //preparo query per inserimento utenti nel db
    const insertUserQuery = 'INSERTI INTO users (name, email, password) VALUES (?,?,?)'
    connection.query(insertUserQuery, [name, email, hashedPassword], (err2, results2) => {
        if(err2) return res.status(500).json({error: err2.message})
            res.status(201).json({message: "Utente registrato con successo!", userId: results2.insertId})

    })
    })
    }
};

module.exports = authController;
