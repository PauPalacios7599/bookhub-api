const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  favoriteBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
})

module.exports = mongoose.model('User', userSchema)
