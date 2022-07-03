const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");
const { uploadUserAvatar, uploadCommentImages, uploadPostImages } = require('../middlewares/addMulter');

router.post('/', authentication, uploadPostImages.single('image'), PostController.create)
router.get('/', authentication, PostController.getAll)
router.get('/id/:_id', authentication, PostController.getById)
router.get('/title/:title', authentication, PostController.getPostsByTitle)
router.put('/id/:_id', authentication, isAuthor, uploadPostImages.single('image'), PostController.update)
router.put('/likes/:_id', authentication, PostController.like);
router.put('/dislikes/:_id', authentication, PostController.dislike);
router.delete('/id/:_id', authentication, isAuthor, PostController.delete)
module.exports = router;