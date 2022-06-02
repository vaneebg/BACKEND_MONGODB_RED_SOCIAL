const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const upload = require('../middlewares/addMulter');
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");

router.post('/', authentication, upload.single('upload'), PostController.create)
router.get('/', authentication, PostController.getAll)
router.get('/id/:_id', authentication, PostController.getById)
router.get('/title/:title', PostController.getPostsByName)
router.put('/id/:_id', authentication, isAuthor, upload.single('upload'), PostController.update)
router.put('/likes/:_id', authentication, PostController.like);
router.put('/dislikes/:_id', authentication, PostController.dislike);
router.delete('/id/:_id', authentication, isAuthor, PostController.delete)
module.exports = router;