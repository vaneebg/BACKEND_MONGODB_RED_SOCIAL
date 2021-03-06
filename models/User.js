const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Por favor introduce tu nombre de usuario"],
    },
    age: {
        type: Number,
        required: [true, "Por favor introduce tu edad"],
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
    postsId: [{
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
    image: String,
    role: String,
}, { timestamps: true });

UserSchema.methods.toJSON = function() {
    const user = this._doc;
    delete user.password;
    delete user.__v;
    delete user.updatedAt;
    delete user.createdAt;
    return user;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;