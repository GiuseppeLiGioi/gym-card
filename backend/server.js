require('dotenv').config();
const cors = require('cors');
const authRouter = require('./routers/authRouter')
const progressRouter = require('./routers/progressRouter')
const sheetsRouter = require('./routers/sheetsRouter')

const connection = require('./data/db')
const port = process.env.PORT || 5000;
const express = require('express')
const app = express()
const frontendUrl = process.env.FRONTEND_APP.replace(/\/$/, ''); // rimuove eventuale slash

const path = require('path');



// Serve la cartella uploads come statica per immagini esercizi
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
  origin: frontendUrl, 
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())

app.use('/auth', authRouter)
app.use('/sheets', sheetsRouter)
app.use('/progress', progressRouter)

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send("server attivo e pronto")
})

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta: ${port}`) 
})