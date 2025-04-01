const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const bookRoutes = require('./routes/bookRoutes')

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/books', bookRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado')
    app.listen(process.env.PORT, () => {
      console.log(`Servidor en puerto ${process.env.PORT}`)
    })
  })
  .catch((err) => console.log(err))
