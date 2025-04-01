const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')

router.post('/', userCtrl.createUser)
router.get('/', userCtrl.getUsers)
router.put('/:id', userCtrl.updateUser)
router.delete('/:id', userCtrl.deleteUser)

module.exports = router
