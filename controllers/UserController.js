const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
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
            if (req.file) req.body.image = req.file.filename
            if (req.body.password !== undefined) {
                hashedPassword = await bcrypt.hashSync(req.body.password, 10)
            }
            const user = await User.create({...req.body, role: "user", password: hashedPassword });
            const emailToken = await jwt.sign({ email: req.body.email }, JWT_SECRET, { expiresIn: '48h' })
            const url = "https://red-social-vaneebg.herokuapp.com/users/confirm/" + emailToken
            await transporter.sendMail({
                to: req.body.email,
                subject: "Confirma tu registro a nuestra red social",
                html: `<h2>¡Hola ${user.username}!</h2>
                <p>Para finalizar tu registro en la suuper red social correctamente <a href=${url}>haz click aquí</a> </p>
                `
            })

            res.status(201).send({ message: "Usuario registrado con éxito", user });
        } catch (error) {
            console.log(error)
            error.origin = 'User'
            next(error)
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            })
            if (!user) {
                return res.status(400).send('Email/contraseña incorrectos')
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send('Email/contraseña incorrectos')
            }
            if (!user.confirmed) {
                return res.status(400).send('No has verificado el usuario, revisa tu correo.')
            }
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.status(200).send({ message: 'Bienvenidx a nuestra suuuper red social ' + user.username + '!!', user });
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudo conectar' })

        }
    },
    async getOne(req, res) {
        try {
            const user = await User.findById(req.user._id)
                .populate({ path: 'postsId' })
                .populate( { path: 'following', select: 'username image' })
                .populate( { path: 'followers', select: 'username image' })
                .populate( { path: 'favList', select: {title:1, body:1, image:1, userId:1,likes:1}, populate: { path: 'userId', select: { username: 1, image: 1, email: 1 } } })

            res.status(200).send({ Followers: user.followers.length, Following: user.following.length, Number_of_posts: user.postsId.length, user })
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudo conseguir tu info' })
        }
    },
    async getById(req, res) {
        try {
            const user = await User.findById(req.params._id)  
            .populate({ path: 'postsId' })
            .populate( { path: 'following', select: 'username image' })
            .populate( { path: 'followers', select: 'username image' })
            .populate( { path: 'favList', select: {title:1, body:1, image:1, userId:1,likes:1}, populate: { path: 'userId', select: { username: 1, image: 1, email: 1 } } })
            res.status(200).send({ Followers: user.followers.length, Following: user.following.length, Number_of_posts: user.postsId.length, user })
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudo conseguir por id el usuario' })
        }
    },
    async getUsersByUsername(req, res) {
        try {
            if (req.params.username.length > 20) {
                return res.status(400).send('Búsqueda demasiado larga')
            }
            const username = new RegExp(req.params.username, "i");
            const user = await User.find({ username })
                .populate({ path: 'postsId' });
            if (user.length === 0) {
                res.status(404).send('Ningún username coincide con tu búsqueda :(')
            } else {
                res.status(200).send({ Followers: user[0].followers.length, Following: user[0].following.length, Number_of_posts: user[0].postsId.length, user });
            }
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudo conseguir por username el usuario' })
        }
    },

    async getAllInfoUsers(req, res) {
        try {
            const users = await User.find({}, { username: 1, email: 1, image: 1, confirmed: 1, followers: 1, following: 1, postsId: 1 })
                .populate({ path: 'postsId', select: { title: 1, body: 1, image: 1 }, populate: { path: 'commentsId', select: { title: 1, body: 1, image: 1 }, populate: { path: 'userId', select: { username: 1, image: 1, email: 1 } } } })
                .populate('favList')
            const listUsers = users.map(user => {
                return { Followers: user.followers.length, Following: user.following.length, Number_of_posts: user.postsId.length, user }
            })
            res.status(200).send(listUsers)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudo conseguir todos los usuarios registrados' })
        }
    },
    async getUserPostComments(req, res) {
        try {
            const users = await User.findById(req.user._id)
                .populate({ path: 'postsId', select: { title: 1, body: 1 }, populate: { path: 'commentsId', select: { title: 1 }, populate: { path: 'userId', select: { username: 1, image: 1, email: 1 } } } })
                .populate('favList', ['title', 'body', 'image'])
                .populate('commentsId')
                .select('username')

            res.status(200).send(users)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudo conseguir toda tuu info' })

        }
    },
    async getAll(req, res) {
        try {
            const users = await User.find({}, { username: 1, email: 1, image: 1, confirmed: 1,  following:1, followers:1})
            res.status(200).send(users)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudo conseguir todo' })

        }
    },
    async getAllLogin(req, res) {
        try {
            const users = await User.find({ tokens: { $ne: [] } }, { username: 1, email: 1, image:1 })
            res.status(200).send(users)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudo conseguir todos los usuarios en linea' })
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
    async validateUserTest(req, res) {
        try {
            await User.updateOne({ email: "german@gmail.com" }, { $set: { confirmed: true } })
            res.status(201).send(`Te has verificado correctamente testing`)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(404).send(`Enlace roto :(`)
        }
    },

    async logout(req, res) {
        try {
          const user=  await User.findByIdAndUpdate(req.user._id, {
                $pull: { tokens: req.headers.authorization },
            });
            res.status(200).send({ message: `Desconectado con éxito, vuelve pronto ${user.username} `});
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({
                message: "Hubo un problema al intentar desconectar al usuario",
            });
        }
    },
    async deleteUserAdmin(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params._id)
            await Post.deleteMany({ userId: req.params._id })
            await Comment.deleteMany({ userId: req.params._id })
            await transporter.sendMail({
                to: user.email,
                subject: "Asunto importante crack",
                html: `<h2>Hola ${user.username}...</h2>
                <p>Te informamos que has sido borrado de nuestra super red Anti-social. Para poder volver, puedes irle pidiendo perdón al admin con tiempo. Saludos crack! </p>
                `
            })
            res.status(200).send({ message: `Usuario con id ${req.params._id} ha sido borrado`, user })
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'Problema para borrar el user admin' })
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.user._id)
            await Post.deleteMany({ userId: req.user._id })
            await Comment.deleteMany({ userId: req.user._id })

            res.status(200).send({ message: `Tu usuario ${req.user.username} ha sido borrado`, user })
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
                    res.status(201).send({ message: "Siguiendo usuario!", user, user2 });
                } else {
                    res.status(400).send({ message: 'No puedes seguir a alguien a quién ya sigues ò_ó' })
                }
            } catch (error) {
                console.log(colors.red.bgWhite(error))
                res.status(500).send({ message: "No se pudo seguir :(" });
            }
        } else {
            res.status(400).send({ message: "Yeee crack, no puedes seguirte a ti mismx! Yee nano, on vas??" })
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
                    res.status(201).send({ message: "Ya no le sigues crack ", user, user2 });
                } else {
                    res.status(400).send({ message: 'Ya lo has dejado de seguir antes :(' })
                }

            } catch (error) {
                console.log(colors.red.bgWhite(error))
                res.status(500).send({ message: "Problema para unfollow" });
            }
        } else {
            res.status(400).send({ message: "Yeee crack, no puedes dejar de seguirte a ti mismx !" })
        }
    },
    async update(req, res) {
        try {
            let hashedPassword;
            if (req.file) req.body.image = req.file.filename
            const { username, password, image } = req.body
            if (password !== undefined) {
                hashedPassword = await bcrypt.hashSync(password, 10)
            }
            const user = await User.findByIdAndUpdate(req.user._id, { username, image, role: "user", password: hashedPassword }, { new: true }).populate({ path: 'postsId' })
            .populate({ path: 'postsId' })
            .populate( { path: 'following', select: 'username image' })
            .populate( { path: 'followers', select: 'username image' })
            .populate( { path: 'favList', select: {title:1, body:1, image:1, userId:1,likes:1}, populate: { path: 'userId', select: { username: 1, image: 1, email: 1 } } })
            res.status(201).send({ message: `User  ${user.username} modificado con éxito`,  Followers: user.followers.length, Following: user.following.length, Number_of_posts: user.postsId.length,user });
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudo modificar el post' })
        }
    },

};
module.exports = UserController;