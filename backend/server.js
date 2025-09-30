require('dotenv').config();
const conncetion = require('./data/db')
const port = process.env.DB_PORT || 5000;

const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send("server attivo e pronto")
})

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta: ${port}`)
})