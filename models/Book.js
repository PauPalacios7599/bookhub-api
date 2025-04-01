const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: String
    }
  ]
})

module.exports = mongoose.model('Book', bookSchema)
