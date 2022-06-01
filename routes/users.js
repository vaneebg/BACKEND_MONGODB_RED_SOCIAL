const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');


router.post('/', UserController.register)
router.post('/login', UserController.login)
router.get('/confirm/:token', UserController.validateUser)

module.exports = router;