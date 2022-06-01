const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const upload = require('../middlewares/addMulter');
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");

router.post('/', authentication, upload.single('upload'), PostController.create)
router.get('/', authentication, isAdmin, PostController.getAll)
router.get('/id/:_id', authentication, PostController.getById)
router.put('/id/:_id', authentication, isAuthor, upload.single('upload'), PostController.update)
router.delete('/id/:_id', authentication, PostController.delete)
module.exports = router;