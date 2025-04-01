const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('../models/User')

dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await User.deleteMany()

  await User.create([
    { name: 'Ana', email: 'ana@gmail.com' },
    { name: 'Juan', email: 'juan@gmail.com' }
  ])

  console.log('Usuarios creados')
  process.exit()
})
