const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const colors = require('colors/safe');

const CommentController = {
    async create(req, res) {
        try {
            if (req.file) req.body.img = req.file.filename
            const comment = await Comment.create({...req.body, userId: req.user._id, postId: req.params._id })
            await Post.findByIdAndUpdate(req.params._id, {
                $push: { commentsId: comment._id },
            });
            await User.findByIdAndUpdate(req.user._id, {
                $push: { commentsId: comment._id },
            });
            res.status(201).send(comment)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el comentario' })
        }
    },
    async update(req, res, next) {
        try {
            if (req.file) req.body.img = req.file.filename
            const comment = await Comment.findByIdAndUpdate(req.params._id, {...req.body, userId: req.user._id, postId: req.params._id }, { new: true })

            res.send({ message: `Comentario con id ${req.params._id} modificado con éxito`, comment });
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            error.origin = 'comment modificar'
            next(error)
        }
    },
    async getAll(req, res, next) {
        try {
            const comments = await Comment.find({}, { createdAt: 0, updatedAt: 0 })
            res.send(comments)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            error.origin = 'comment traer todos'
            next(error)
        }
    },
    async delete(req, res) {
        try {
            const comment = await Comment.findByIdAndDelete(req.params._id, { userId: req.user._id, postId: req.params._id })
            res.send({ message: `Comentario con id ${req.params._id} ha sido borrado`, comment })
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'Problema para borrar el comentario' })
        }
    },
    async getById(req, res, next) {
        try {
            const comment = await Comment.findById(req.params._id)
            res.send(comment)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            error.origin = 'comment traer id'
            next(error)
        }
    },
    async like(req, res) {
        try {
            const existComment = await Comment.findById(req.params._id)
            if (!existComment.likes.includes(req.user._id)) {
                const comment = await Comment.findByIdAndUpdate(
                    req.params._id, { $push: { likes: req.user._id } }, { new: true }
                );

                await User.findByIdAndUpdate(
                    req.user._id, { $push: { favComments: req.params._id } }, { new: true }
                );
                res.send(comment);
            } else {
                res.status(400).send({ message: 'No te infles a likes en el comentario bro :(' })
            }

        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: "No dió like al comentario :(" });
        }
    },
    async dislike(req, res) {
        try {
            const existComment = await Comment.findById(req.params._id)
            if (existComment.likes.includes(req.user._id)) {
                const comment = await Comment.findByIdAndUpdate(
                    req.params._id, { $pull: { likes: req.user._id } }, { new: true }
                );

                await User.findByIdAndUpdate(
                    req.user._id, { $pull: { favComments: req.params._id } }, { new: true }
                );
                res.send({ message: 'Dislike al comentario hecho con éxito!' });
            } else {
                res.status(400).send({ message: 'No tiene likes este comentario ya :(' })
            }

        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: "Problema para dislike en comment" });
        }
    },
}
module.exports = CommentController;