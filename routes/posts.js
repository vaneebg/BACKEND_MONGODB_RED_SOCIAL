const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');

router.post('/', PostController.create)
router.get('/', PostController.getAll)
router.get('/id/:_id', PostController.getById)
router.put('/id/:_id', PostController.update)
router.delete('/id/:_id', PostController.delete)
module.exports = router;