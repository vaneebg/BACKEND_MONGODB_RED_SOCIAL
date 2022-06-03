const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Por favor introduce tu nombre de usuario"],
    },
    email: {
        type: String,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Este email no es válido"],
        unique: true,
        required: [true, "Por favor introduce tu email"],

    },
    password: {
        type: String,
        required: [true, "Por favor introduce una contraseña"],
    },
    confirmed: Boolean,
    tokens: [],
    postId: [{
        type: ObjectId,
        ref: 'Post'
    }],
    favList: [{
        type: ObjectId,
        ref: 'Post'
    }],
    favComments: [{
        type: ObjectId,
        ref: 'Comment'
    }],
    commentsId: [{
        type: ObjectId,
        ref: 'Comment'
    }],
    following: [{
        type: ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: ObjectId,
        ref: 'User'
    }],
    img: String,
    role: String,
}, { timestamps: true });

UserSchema.methods.toJSON = function() {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    return user;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;