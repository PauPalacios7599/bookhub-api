const Book = require('../models/Book')
const User = require('../models/User')

exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body)
    await book.save()
    res.status(201).json(book)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('reviews.user')
    res.json(books)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    if (!book) return res.status(404).json({ message: 'Libro no encontrado' })

    res.json(book)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)

    if (!book) return res.status(404).json({ message: 'Libro no encontrado' })

    res.json({ message: 'Libro eliminado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.addReview = async (req, res) => {
  try {
    const { bookId } = req.params
    const { userId, content } = req.body

    const book = await Book.findById(bookId)
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' })

    book.reviews.push({ user: userId, content })
    await book.save()
    res.json(book)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.addFavoriteBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    if (!user.favoriteBooks.includes(bookId)) {
      user.favoriteBooks.push(bookId)
      await user.save()
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
