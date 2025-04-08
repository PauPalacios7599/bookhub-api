const User = require('../models/User')

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body

    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'El usuario ya existe' })

    const user = new User({ name, email })
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('favoriteBooks')
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    res.json({ message: 'Usuario eliminado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.addFavoriteBook = async (req, res) => {
  try {
    const { id, bookId } = req.params

    const user = await User.findById(id)
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    const alreadyFavorite = user.favoriteBooks.includes(bookId)
    if (alreadyFavorite) {
      return res.status(400).json({ message: 'El libro ya está en favoritos' })
    }

    user.favoriteBooks.push(bookId)
    await user.save()

    res.status(200).json({
      message: 'Libro añadido a favoritos correctamente',
      favoriteBooks: user.favoriteBooks
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
