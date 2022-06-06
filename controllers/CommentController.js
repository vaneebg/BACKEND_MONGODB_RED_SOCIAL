const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const colors = require('colors/safe');

const CommentController = {
    async create(req, res, next) {
        try {
            if (req.file) req.body.image = req.file.filename
            const comment = await Comment.create({...req.body, userId: req.user._id, postId: req.params._id })
            await Post.findByIdAndUpdate(req.params._id, {
                $push: { commentsId: comment._id },
            });
            await User.findByIdAndUpdate(req.user._id, {
                $push: { commentsId: comment._id },
            });
            res.status(201).send({ message: 'Se creó tu comentario!', comment })
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            console.error(error)
            error.origin = 'comment modificar'
            next(error)

        }
    },
    async update(req, res) {
        try {
            if (req.file) req.body.image = req.file.filename
            const comment = await Comment.findByIdAndUpdate(req.params._id, {...req.body, userId: req.user._id, postId: req.params._id }, { new: true })

            res.status(201).send({ message: `Comentario con id ${req.params._id} modificado con éxito`, comment });
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(201).send({ message: 'No se pudo actualizar el comentario' })
        }
    },
    async getAll(req, res) {
        try {
            const comments = await Comment.find()
            res.status(200).send({ Number_of_comments: comments.length, comments })
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudieron conseguir los comentarios' })

        }
    },
    async delete(req, res) {
        try {
            const comment = await Comment.findByIdAndDelete(req.params._id)
            res.status(200).send({ message: `Comentario con id ${req.params._id} ha sido borrado`, comment })
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'Problema para borrar el comentario' })
        }
    },
    async getById(req, res) {
        try {
            const comment = await Comment.findById(req.params._id)
            res.status(200).send(comment)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudo conseguir por Id el comentario' })
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
                res.status(201).send({ message: 'Le diste like!', comment });
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
                await Comment.findByIdAndUpdate(
                    req.params._id, { $pull: { likes: req.user._id } }, { new: true }
                );

                await User.findByIdAndUpdate(
                    req.user._id, { $pull: { favComments: req.params._id } }, { new: true }
                );
                res.status(201).send({ message: 'Dislike al comentario hecho con éxito!' });
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