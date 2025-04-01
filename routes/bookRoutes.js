const express = require('express')
const router = express.Router()
const bookCtrl = require('../controllers/bookController')

router.post('/', bookCtrl.createBook)
router.get('/', bookCtrl.getBooks)
router.put('/:id', bookCtrl.updateBook)
router.delete('/:id', bookCtrl.deleteBook)

router.post('/:bookId/review', bookCtrl.addReview)
router.post('/favorite', bookCtrl.addFavoriteBook)

module.exports = router
