const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');
const upload = require('../middlewares/addMulter');
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");

router.post('/', upload.single('upload'), UserController.register)
router.post('/login', UserController.login)
router.get('/', authentication, isAdmin, UserController.getAll)
router.get('/myinfo', authentication, UserController.getOne)
router.get('/usersPostsComments', authentication, isAdmin, UserController.getUsersPostandComment)
router.get('/yourPostsAndComment', authentication, UserController.getUserPostComments)
router.get('/allconnects', authentication, isAdmin, UserController.getAllLogin)
router.get('/confirm/:token', UserController.validateUser)
router.delete('/logout', authentication, UserController.logout)

module.exports = router;