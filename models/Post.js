const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    img: String,
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    commentsId: [{
        type: ObjectId,
        ref: 'Comment'
    }],

}, { timestamps: true });
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;