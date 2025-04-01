const User = require('../models/User')

exports.createUser = async (req, res) => {
  const { name, email } = req.body
  const exists = await User.findOne({ email })
  if (exists) return res.status(400).json({ message: 'Usuario ya existe' })

  const user = new User({ name, email })
  await user.save()
  res.status(201).json(user)
}

exports.getUsers = async (req, res) => {
  const users = await User.find().populate('favoriteBooks')
  res.json(users)
}

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  res.json(user)
}

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json({ message: 'Usuario eliminado' })
}
