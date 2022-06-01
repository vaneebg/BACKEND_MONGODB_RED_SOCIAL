const Post = require("../models/Post");
const PostController = {
    async create(req, res) {
        try {
            const post = await Post.create({...req.body, img: req.file.filename, userId: req.user._id })

            res.status(201).send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el Post' })
        }
    },
    async getAll(req, res) {
        try {
            const posts = await Post.find()
            res.send(posts)
        } catch (error) {
            console.error(error);
        }
    },
    async getById(req, res) {
        try {
            const post = await Post.findById(req.params._id)
            res.send(post)
        } catch (error) {
            console.error(error);
        }
    },
    async update(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(req.params._id, {...req.body, img: req.file.filename, userId: req.user._id }, { new: true })

            res.send({ message: `post with id ${req.params._id} successfully updated`, post });
        } catch (error) {
            console.error(error);
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