const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET
const transporter = require('../config/nodemailer');
const colors = require('colors/safe');

const UserController = {
    async register(req, res, next) {
        try {
            req.body.confirmed = false
            let hashedPassword;
            if (req.file) req.body.img = req.file.filename
            if (req.body.password !== undefined) {
                hashedPassword = await bcrypt.hashSync(req.body.password, 10)
            }
            const user = await User.create({...req.body, role: "user", password: hashedPassword });
            const emailToken = await jwt.sign({ email: req.body.email }, JWT_SECRET, { expiresIn: '48h' })
            const url = "http://localhost:8080/users/confirm/" + emailToken
            await transporter.sendMail({
                to: req.body.email,
                subject: "Confirma tu registro a nuestra red social",
                html: `<h2>¡Hola ${user.username}!</h2>
                <p>Para finalizar tu registro en la suuper red social correctamente <a href=${url}>haz click aquí</a> </p>
                `
            })

            res.status(201).send({ message: "Usuario registrado con éxito", user });
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            error.origin = 'usuario register'
            next(error)
        }
    },
    async login(req, res, next) {
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
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: 'Bienvenidx a nuestra suuuper red social ' + user.username + '!!' });
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            error.origin = 'usuario login'
            next(error)
        }
    },
    async getOne(req, res, next) {
        try {
            const user = await User.findById(req.user._id)
                .populate({ path: 'postId', select: { createdAd: 0, updatedAd: 0 } })
            res.send({ user, Followers: user.followers.length, Following: user.following.length })
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            error.origin = 'usuario info login'
            next(error)
        }
    },
    async getById(req, res, next) {
        try {
            const user = await User.findById(req.params._id)
            res.send(user)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            error.origin = 'user traer id'
            next(error)
        }
    },
    async getUsersByUsername(req, res, next) {
        try {
            if (req.params.username.length > 20) {
                return res.status(400).send('Búsqueda demasiado larga')
            }
            const username = new RegExp(req.params.username, "i");
            const user = await User.find({}, { username: 1, email: 1, img: 1, confirmed: 1 });
            if (user.length === 0) {
                res.status(404).send('Ningún username coincide con tu búsqueda :(')
            } else {
                res.status(200).send(user);
            }
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            error.origin = 'user traer por nombre'
            next(error)
        }
    },

    async getAllInfoUsers(req, res, next) {
        try {
            const users = await User.find({}, { username: 1, email: 1, img: 1, confirmed: 1 })
                .populate({ path: 'postId', populate: { path: 'commentsId', populate: { path: 'userId', select: { username: 1, img: 1, email: 1 } } } })
                .populate('favList')

            res.send(users)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            error.origin = 'usuarios posts/comments'
            next(error)
        }
    },
    async getUserPostComments(req, res, next) {
        try {
            const users = await User.findById(req.user._id)
                .populate({ path: 'postId', populate: { path: 'commentsId', populate: { path: 'userId', select: { username: 1, img: 1, email: 1 } } } })
                .populate('favList')
            res.send(users)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            error.origin = 'usuario con su post/comment'
            next(error)
        }
    },
    async getAll(req, res, next) {
        try {
            const users = await User.find({}, { username: 1, email: 1, img: 1, confirmed: 1 })
            res.send(users)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            error.origin = 'todos los usuarios registrados'
            next(error)
        }
    },
    async getAllLogin(req, res, next) {
        try {
            const users = await User.find({ tokens: { $ne: [] } }, { createdAt: 0, updatedAt: 0 })
            res.send(users)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            error.origin = 'todos los usuarios en linea'
            next(error)
        }
    },

    async validateUser(req, res) {
        try {
            const payload = jwt.verify(req.params.token, JWT_SECRET)
            await User.updateOne({ email: payload.email }, { $set: { confirmed: true } })
            res.status(201).send(`Te has verificado correctamente`)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
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
            console.log(colors.red.bgWhite(error))
            res.status(500).send({
                message: "Hubo un problema al intentar conectar al usuario",
            });
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params._id, { userId: req.user._id })
            res.send({ message: `Usuario con id ${req.params._id} ha sido borrado`, user })
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'Problema para borrar el user' })
        }
    },
    async following(req, res) {
        if (req.params._id != req.user._id) {
            try {
                const existUser = await User.findById(req.params._id)
                if (!existUser.followers.includes(req.user._id)) {
                    const user = await User.findByIdAndUpdate(
                        req.params._id, { $push: { followers: req.user._id } }, { new: true }
                    );
                    const user2 = await User.findByIdAndUpdate(
                        req.user._id, { $push: { following: req.params._id } }, { new: true }
                    );
                    res.send({ message: "El usuario al que ahora sigues ", user, user2 });
                } else {
                    res.status(400).send({ message: 'No puedes seguir a alguien a quién ya sigues ò_ó' })
                }

            } catch (error) {
                console.log(colors.red.bgWhite(error))
                res.status(500).send({ message: "No se pudo seguir :(" });
            }
        } else {
            res.status(400).send({ message: "Yeee crack, no puedes seguirte a ti mismx !" })
        }
    },
    async unfollow(req, res) {
        if (req.user._id != req.params._id) {
            try {
                const existUser = await User.findById(req.params._id)
                if (existUser.followers.includes(req.user._id)) {
                    const user = await User.findByIdAndUpdate(
                        req.params._id, { $pull: { followers: req.user._id } }, { new: true },
                    );
                    const user2 = await User.findByIdAndUpdate(
                        req.user._id, { $pull: { following: req.params._id } }, { new: true }
                    );
                    res.send({ message: "El usuario al que ahora ya no sigues ", user, user2 });
                } else {
                    res.status(400).send({ message: 'Ya lo has dejado de seguir!! :(' })
                }

            } catch (error) {
                console.log(colors.red.bgWhite(error))
                res.status(500).send({ message: "Problema para unfollow" });
            }
        } else {
            res.status(400).send({ message: "Yeee crack, no puedes dejar de seguirte a ti mismx !" })
        }
    }

};
module.exports = UserController;