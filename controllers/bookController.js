const Book = require('../models/Book')
const User = require('../models/User')

exports.createBook = async (req, res) => {
  const book = new Book(req.body)
  await book.save()
  res.status(201).json(book)
}

exports.getBooks = async (req, res) => {
  const books = await Book.find().populate('reviews.user')
  res.json(books)
}

exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  res.json(book)
}

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id)
  res.json({ message: 'Libro eliminado' })
}

exports.addReview = async (req, res) => {
  const { bookId } = req.params
  const { userId, content } = req.body

  const book = await Book.findById(bookId)
  if (!book) return res.status(404).json({ message: 'Libro no encontrado' })

  book.reviews.push({ user: userId, content })
  await book.save()
  res.json(book)
}

exports.addFavoriteBook = async (req, res) => {
  const { userId, bookId } = req.body

  const user = await User.findById(userId)
  if (!user.favoriteBooks.includes(bookId)) {
    user.favoriteBooks.push(bookId)
    await user.save()
  }

  res.json(user)
}
