const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    postId: [{
        type: ObjectId,
        ref: 'Post'
    }],

    email: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        required: true
    },
    confirmed: Boolean,
    tokens: [],
    role: String,
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;