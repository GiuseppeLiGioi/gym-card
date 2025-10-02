require('dotenv').config();
const cors = require('cors');
const authRouter = require('./routers/authRouter')
const progressRouter = require('./routers/progressRouter')
const sheetsRouter = require('./routers/sheetsRouter')

const connection = require('./data/db')
const port = process.env.PORT || 5000;
const express = require('express')
const app = express()

//middleware generali
app.use(cors({
    origin: process.env.FRONTEND_APP
}))
app.use(express.static('public'));
app.use(express.json())

app.use('/auth', authRouter)
app.use('/sheets', sheetsRouter)
app.use('/progress', progressRouter)

app.get('/', (req, res) => {
    res.send("server attivo e pronto")
})

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta: ${port}`) 
})