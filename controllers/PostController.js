const Post = require("../models/Post");
const User = require("../models/User");
const PostController = {
    async create(req, res, next) {
        try {
            if (req.file) req.body.img = req.file.filename
            const post = await Post.create({...req.body, userId: req.user._id })
            await User.findByIdAndUpdate(req.user._id, {
                $push: { postId: post._id }
            });
            res.status(201).send(post)
        } catch (error) {
            error.origin = 'post crear'
            next(error)
        }
    },
    async getAll(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const posts = await Post.find()
                .limit(limit * 1)
                .skip((page - 1) * limit);
            res.send(posts);
        } catch (error) {
            error.origin = 'post traer todos'
            next(error)
        }
    },
    async getById(req, res, next) {
        try {
            const post = await Post.findById(req.params._id)
            res.send(post)
        } catch (error) {
            error.origin = 'post traer id'
            next(error)
        }
    },
    async getPostsByName(req, res, next) {
        try {
            if (req.params.title.length > 20) {
                return res.status(400).send('Busqueda demasiado larga')
            }
            const title = new RegExp(req.params.title, "i");
            const post = await Post.find({ title });
            res.send(post);
        } catch (error) {
            error.origin = 'post traer por nombre'
            next(error)
        }
    },
    async update(req, res, next) {
        try {
            const post = await Post.findByIdAndUpdate(req.params._id, {...req.body, img: req.file.filename, userId: req.user._id }, { new: true })

            res.send({ message: `Post con id ${req.params._id} modificado con éxito`, post });
        } catch (error) {
            error.origin = 'post modificar'
            next(error)
        }
    },
    async like(req, res) {
        try {
            const existPost = await Post.findById(req.params._id)
            if (!existPost.likes.includes(req.user._id)) {
                const post = await Post.findByIdAndUpdate(
                    req.params._id, { $push: { likes: req.user._id } }, { new: true }
                );

                await User.findByIdAndUpdate(
                    req.user._id, { $push: { favList: req.params._id } }, { new: true }
                );
                res.send(post);
            } else {
                res.status(400).send({ message: 'No te infles a likes bro :(' })
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "No dió like :(" });
        }
    },
    async dislike(req, res) {
        try {
            const existPost = await Post.findById(req.params._id)
            if (existPost.likes.includes(req.user._id)) {
                const post = await Post.findByIdAndUpdate(
                    req.params._id, { $pull: { likes: req.user._id } }, { new: true }
                );

                await User.findByIdAndUpdate(
                    req.user._id, { $pull: { favList: req.params._id } }, { new: true }
                );
                res.send('Like hecho con éxito!', post);
            } else {
                res.status(400).send({ message: 'No tiene likes ya :(' })
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Problema para dislike :(" });
        }
    },
    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id, { userId: req.user._id })
            res.send({ post, message: `Post with id ${req.params._id} deleted` })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem trying to remove the post' })
        }
    },

}
module.exports = PostController;