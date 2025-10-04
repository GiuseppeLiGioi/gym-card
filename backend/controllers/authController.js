const connection = require('../data/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    register: (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "tutti i campi sono obbligatori" })
        }
        //verifico le email
        const verifyEmailQuery = 'SELECT * FROM users WHERE id = ?'
        connection.query(verifyEmailQuery, [email], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            if (results.length > 0) {
                return res.status(404).json({ message: "Email già registrata" })
            }
            //hash password: rendo crtptata la password
            const hashedPassword = bcrypt.hashSync(password)
            //preparo query per inserimento utenti nel db
            const insertUserQuery = 'INSERT INTO users (name, email, password) VALUES (?,?,?)'
            connection.query(insertUserQuery, [name, email, hashedPassword], (err2, results2) => {
                if (err2) return res.status(500).json({ error: err2.message })
                res.status(201).json({ message: "Utente registrato con successo!", userId: results2.insertId })

            })
        })
    },

    login: (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "i campi email e password sono obbligatori" })
        }

        //prepariamo query per login
        const loginQuery = 'SELECT * FROM users WHERE email = ?'
        connection.query(loginQuery, [email], (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) return res.status(404).json({ message: "Utente non trovato" })

            const user = results[0]

            //confronto della password tra quella inserita e quella registrata
            const isPasswordValid = bcrypt.compareSync(password, user.password)
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Password errata" })
            }
            //se login ok, generiamo token JWT
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )

            //terminato tutto, mandiamo risposta positiva
            res.json({
                message: "Login effettuato con successo",
                token,
                user: { id: user.id, name: user.name, email: user.email }
            })
        }
        )

    },

    verifyUser: (req,res) => {

    const userId = req.user.userId


    const verifyUserQuery = 'SELECT * FROM users WHERE id = ?'
    connection.query(verifyUserQuery, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) return res.status(401).json({ message: "Non è stato possibile ricevere le informazioni dell'utente, non Autorizzato" })

                
            res.status(200).json({
            userName: results[0].name,
            userEmail: results[0].email,
            userId: userId
            })
    })

    }
};

module.exports = authController;
