const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
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