const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwt_secret } = require('../config/keys.js')
const transporter = require('../config/nodemailer');


const UserController = {
    async register(req, res) {
        try {
            const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
            const user = await User.create({...req.body, role: "user", password: hashedPassword });
            const emailToken = await jwt.sign({ email: req.body.email }, jwt_secret, { expiresIn: '48h' })

            res.status(201).send({ message: "Usuario registrado con éxito, entra en tu email para confirmarlo", user });
        } catch (error) {
            console.error(error);
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            })
            const token = jwt.sign({ _id: user._id }, jwt_secret);;
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: 'Bienvenidx a nuestra suuuper red social! ' + user.username, token });
        } catch (error) {
            console.error(error);
        }
    },


};
module.exports = UserController;