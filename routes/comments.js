const express = require('express');
const router = express.Router()
const CommentController = require('../controllers/CommentController');
const upload = require('../middlewares/addMulter');
const { authentication, isAdmin, isAuthor, isAuthor2 } = require("../middlewares/authentication");

router.post('/idpost/:_id', authentication, upload.single('upload'), CommentController.create)
router.put('/idcomment/:_id', authentication, isAuthor2, upload.single('upload'), CommentController.update)
    // router.get('/', authentication, PostController.getAll)
    // router.get('/id/:_id', authentication, PostController.getById)
    // router.put('/id/:_id', authentication, isAuthor, upload.single('upload'), PostController.update)
    // router.delete('/id/:_id', authentication, isAuthor, PostController.delete)
module.exports = router;