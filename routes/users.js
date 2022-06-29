const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');

const { authentication, isAdmin } = require("../middlewares/authentication");
const { uploadUserAvatar, uploadCommentImages, uploadPostImages } = require('../middlewares/addMulter');


router.post('/', uploadUserAvatar.single('upload'), UserController.register)
router.post('/login', UserController.login)
router.get('/', authentication, isAdmin, UserController.getAll)
router.get('/myinfo', authentication, UserController.getOne)
router.get('/usersPostsComments', authentication, isAdmin, UserController.getAllInfoUsers)
router.get('/yourPostsAndComment', authentication, UserController.getUserPostComments)
router.get('/allconnects', authentication, isAdmin, UserController.getAllLogin)
// router.get('/confirm/:token', UserController.validateUser)
router.delete('/logout', authentication, UserController.logout)
router.get('/id/:_id', authentication, UserController.getById)
router.get('/username/:username', authentication, UserController.getUsersByUsername)
router.delete('/userId/:_id', authentication, isAdmin, UserController.deleteUserAdmin)
router.put('/followUser/:_id', authentication, UserController.following)
router.put('/unfollowUser/:_id', authentication, UserController.unfollow)
router.delete('/yourUserDelete', authentication, UserController.deleteUser)
router.put('/modifyUser', authentication, uploadUserAvatar.single('upload'), UserController.update)

module.exports = router;