require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

const app = express()
const PORT = 3000

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

app.get('/', (req, res) => {
    res.json({message: "Hello World"})
})

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.vmgpziv.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then(() => {
    console.log('Conectado ao mongoDB')
    app.listen(PORT)

})
.catch((err) => {
    console.log(err)
})
