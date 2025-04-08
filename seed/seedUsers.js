const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('../models/User')
const Book = require('../models/Book')

dotenv.config()

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('📡 Conectado a MongoDB')

    // Limpia las colecciones
    await User.deleteMany()
    await Book.deleteMany()

    // Crea usuarios
    const users = await User.insertMany([
      { name: 'Ana', email: 'ana@gmail.com' },
      { name: 'Juan', email: 'juan@gmail.com' }
    ])

    console.log('✅ Usuarios creados')

    // Crea libros
    const books = await Book.insertMany([
      {
        title: 'El Quijote',
        author: 'Miguel de Cervantes',
        genre: 'Clásico',
        reviews: [
          { user: users[0]._id, content: 'Una obra maestra' },
          { user: users[1]._id, content: 'Un poco largo, pero genial' }
        ]
      },
      {
        title: 'Cien Años de Soledad',
        author: 'Gabriel García Márquez',
        genre: 'Realismo mágico',
        reviews: [{ user: users[1]._id, content: 'Impresionante narrativa' }]
      }
    ])

    console.log('✅ Libros creados con reseñas')

    // Añadir libros favoritos a los usuarios
    users[0].favoriteBooks.push(books[0]._id)
    users[1].favoriteBooks.push(books[0]._id, books[1]._id)

    await users[0].save()
    await users[1].save()

    console.log('✅ Libros añadidos a favoritos')

    console.log('🎉 Base de datos sembrada correctamente')
    process.exit()
  } catch (error) {
    console.error('❌ Error sembrando la base de datos:', error)
    process.exit(1)
  }
}

seed()
