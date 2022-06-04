const express = require('express');
const router = express.Router()
const CommentController = require('../controllers/CommentController');
const upload = require('../middlewares/addMulter');
const { authentication, isAdmin, isAuthor2 } = require("../middlewares/authentication");

router.post('/idpost/:_id', authentication, upload.single('upload'), CommentController.create)
router.put('/idcomment/:_id', authentication, isAuthor2, upload.single('upload'), CommentController.update)
router.get('/', authentication, isAdmin, CommentController.getAll)
router.get('/id/:_id', authentication, CommentController.getById)
router.delete('/id/:_id', authentication, isAuthor2, CommentController.delete)
router.put('/likesComment/:_id', authentication, CommentController.like);
router.put('/dislikesComment/:_id', authentication, CommentController.dislike);
module.exports = router;