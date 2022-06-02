const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");

router.post('/', UserController.register)
router.post('/login', UserController.login)
router.get('/', authentication, isAdmin, UserController.getAll)
router.get('/myinfo', authentication, UserController.getOne)
router.get('/userspostscomments', authentication, isAdmin, UserController.getUsersPostandComment)
router.get('/yourpostsandcomment', authentication, UserController.getUserPostComments)
router.get('/allconnects', authentication, isAdmin, UserController.getAllLogin)
router.get('/confirm/:token', UserController.validateUser)
router.delete('/logout', authentication, UserController.logout)

module.exports = router;