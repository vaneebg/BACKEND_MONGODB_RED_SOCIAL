const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development']
const transporter = require("../config/nodemailer");
const UserController = {
    async create(req, res) {
        try {
            const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
            const user = await User.create({...req.body, password: hashedPassword });
            const emailToken = await jwt.sign({ email: req.body.email }, jwt_secret, { expiresIn: '48h' })
            const url = "http://localhost:8080/users/confirm/" + emailToken
            await transporter.sendMail({
                to: req.body.email,
                subject: "Confirma tu registro en nuestra red social",
                html: `<h2>¡Hola ${user.username}!</h2>
                <p>Para finalizar registro correctamente <a href=${url}>haz click aquí</a></p>
                `
            })
            res.status(201).send(user)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el User' })
        }
    },

    async login(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                res.send('Email/contraseña incorrectos')
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!isMatch) {
                res.send('Email/contraseña incorrectos')
            }
            if (!user.confirmed) {
                res.sendStatus(200).send('No has verificado el usuario, revisa tu correo.')
            }
            const token = jwt.sign({ id: user._id }, jwt_secret);
            // Token.create({ token: token, UserId: user.id })
            res.send({ message: 'Eres un crack, fiera, mastodonte', user, token })
        } catch (error) {
            console.error(error);
        }
    },
}
module.exports = UserController;