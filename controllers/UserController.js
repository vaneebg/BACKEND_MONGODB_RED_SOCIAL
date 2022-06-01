const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwt_secret } = require('../config/keys.js')
const transporter = require('../config/nodemailer');
const colors = require('colors');


const UserController = {
    async register(req, res) {
        try {
            req.body.confirmed = false
            const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
            const user = await User.create({...req.body, role: "user", password: hashedPassword });
            const emailToken = await jwt.sign({ email: req.body.email }, jwt_secret, { expiresIn: '48h' })
            const url = "http://localhost:8080/users/confirm/" + emailToken
            await transporter.sendMail({
                to: req.body.email,
                subject: "Confirma tu registro a nuestra red social",
                html: `<h2>¡Hola ${user.username}!</h2>
                <p>Para finalizar tu registro correctamente <a href=${url}>haz click aquí</a> UwU</p>
                `
            })

            res.status(201).send({ message: "Usuario registrado con éxito", user });
        } catch (error) {
            console.log.colors.red.underline.bgBrightBlue(error);
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            })
            if (!user) {
                return res.send('Email/contraseña incorrectos')
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!isMatch) {
                return res.send('Email/contraseña incorrectos')
            }
            if (!user.confirmed) {
                return res.status(400).send('No has verificado el usuario, revisa tu correo.')
            }
            const token = jwt.sign({ _id: user._id }, jwt_secret);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: 'Bienvenidx a nuestra suuuper red social! ' + user.username, token });
        } catch (error) {
            console.error(error);
            res.send(error)
        }
    },
    async getOne(req, res) {
        try {
            const users = await User.findById(req.user._id)
            res.send(users)
        } catch (error) {
            console.error(error);
            res.send(error)
        }
    },
    async getUserandPost(req, res) {
        try {
            const users = await User.find().populate('postId')
            res.send(users)
        } catch (error) {
            console.error(error);
            res.send(error)
        }
    },
    async getAll(req, res) {
        try {
            const users = await User.find()
            res.send(users)
        } catch (error) {
            console.error(error);
            res.send(error)
        }
    },
    async getAllLogin(req, res) {
        try {
            const users = await User.find({ tokens: { $ne: [] } })
            res.send(users)
        } catch (error) {
            console.error(error);
            res.send(error)
        }
    },

    async validateUser(req, res) {
        try {
            const payload = jwt.verify(req.params.token, jwt_secret)
            await User.updateOne({ email: payload.email }, { $set: { confirmed: true } })
            res.status(201).send(`Te has verificado correctamente`)
        } catch (error) {
            console.error(error)
            res.status(404).send(`Enlace roto :(`)
        }
    },
    async logout(req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { tokens: req.headers.authorization },
            });
            res.send({ message: "Desconectado con éxito" });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "Hubo un problema al intentar conectar al usuario",
            });
        }
    },
};
module.exports = UserController;