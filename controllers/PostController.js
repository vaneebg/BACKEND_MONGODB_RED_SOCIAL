const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const colors = require('colors/safe');

const PostController = {
    async create(req, res, next) {
        try {
            if (req.file) req.body.image = req.file.filename
            const post = await Post.create({...req.body, userId: req.user._id }) 
            const postCreated = await Post.find({_id: post._id})
            .populate({ path: 'userId', select: 'username email image' })
            await User.findByIdAndUpdate(req.user._id, {
                $push: { postsId: post._id }
            })
           
            res.status(201).send({ message: 'se creó el post correctamente', postCreated })
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            error.origin = 'post crear'
            next(error)
        }
    },

  
    async getAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const numberPosts = await Post.count()
            const posts = await Post.find({}, { title: 1, body: 1, image: 1, likes:1, createdAt:1})
                .populate({ path: 'userId', select: 'username email image' })
                .populate({ path: 'commentsId', populate: { path: 'userId', select: 'username image likes' } })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({$natural:-1})
            res.status(200).send({numberPosts, posts });
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudo conseguir todos los posts' })

        }
    },

    async getById(req, res) {
        try {
            const post = await Post.findById(req.params._id).populate({ path: 'commentsId', populate: { path: 'userId', select: 'username image likes' } })
            res.status(200).send(post)
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudo conseguir el post por id' })

        }
    },
    async getPostsByTitle(req, res) {
        try {
            if (req.params.title.length > 20) {
                return res.status(400).send('Búsqueda demasiado larga')
            }
            const title = new RegExp(req.params.title, "i");
            const post = await Post.find({ title }, { title: 1, body: 1, image: 1, likes:1, createdAt:1})
                 .populate({ path: 'userId', select: 'username email image' })
                .populate({ path: 'commentsId', populate: { path: 'userId', select: 'username image likes' } })
            if (post.length === 0) {
                res.status(404).send('Ningún título de post coincide con tu búsqueda :(')
            } else {
                res.status(200).send(post);

            }

        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudo conseguir el post por título' })

        }
    },
    async update(req, res) {
        try {
            if (req.file) req.body.image = req.file.filename
            const post = await Post.findByIdAndUpdate(req.params._id, {...req.body, userId: req.user._id }, { new: true }).populate({ path: 'commentsId', populate: { path: 'userId', select: 'username image likes' } })
            res.status(201).send({ message: `Post con el título ${post.title} modificado con éxito`, post });
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'No se pudo modificar el post' })
        }
    },
    async like(req, res) {
        try {
            const existPost = await Post.findById(req.params._id)
           
            if (!existPost.likes.includes(req.user._id)) {
                const post = await Post.findByIdAndUpdate(
                    req.params._id, { $push: { likes: req.user._id } }, { new: true }
                ).populate({ path: 'userId', select: 'username email image' })
                .populate({ path: 'commentsId', populate: { path: 'userId', select: 'username image likes' } })

                await User.findByIdAndUpdate(
                    req.user._id, { $push: { favList: req.params._id } }, { new: true }
                );
                res.status(201).send({ message: 'Se dió like correctamente!', post });
            } else {
                res.status(400).send({ message: 'No te infles a likes bro :(' })
            }

        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: "No dió like :(" });
        }
    },
    async dislike(req, res) {
        try {
            const existPost = await Post.findById(req.params._id)
            if (existPost.likes.includes(req.user._id)) {
              const post=  await Post.findByIdAndUpdate(
                    req.params._id, { $pull: { likes: req.user._id } }, { new: true }
                ).populate({ path: 'userId', select: 'username email image' })
                .populate({ path: 'commentsId', populate: { path: 'userId', select: 'username image likes' } })
                await User.findByIdAndUpdate(
                    req.user._id, { $pull: { favList: req.params._id } }, { new: true }
                );
                res.status(201).send({ message: 'Dislike hecho con éxito!',post });
            } else {
                res.status(400).send({ message: 'No tiene likes ya :(' })
            }

        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: "Problema para dislike :(" });
        }
    },
    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)
            await Comment.deleteMany({ postId: req.params._id })
            res.status(200).send({ message: `Post con título ${post.title} ha sido borrado`, post })
        } catch (error) {
            console.log(colors.red.bgWhite(error))
            res.status(500).send({ message: 'Problema para borrar el post' })
        }
    },

}
module.exports = PostController;