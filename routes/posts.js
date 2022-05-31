const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const upload = require('../middlewares/addMulter');

router.post('/', upload.single('upload'), PostController.create)
router.get('/', PostController.getAll)
router.get('/id/:_id', PostController.getById)
router.put('/id/:_id', upload.single('upload'), PostController.update)
router.delete('/id/:_id', PostController.delete)
module.exports = router;