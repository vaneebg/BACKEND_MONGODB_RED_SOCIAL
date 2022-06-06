const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Por favor introduce un título para el post"],
    },
    body: {
        type: String,
        required: [true, "Por favor introduce el cuerpo del post"],
    },
    image: String,
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

PostSchema.methods.toJSON = function() {
    const post = this._doc;
    delete post.__v;
    delete post.updatedAt;
    delete post.createdAt;
    return post;
}
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;