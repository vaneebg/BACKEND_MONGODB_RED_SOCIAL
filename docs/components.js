module.exports = {
    components: {
        securitySchemes: {
            ApiKeyAuth: {
                type: "apiKey",
                name: "Authorization",
                in: "header"
            },
        },
        schemas: {
            comments: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'objectId',
                        description: "comment identification number",
                        example: "6201064b0028de7866e2b2c4"
                    },
                    title: {
                        type: 'string',
                        description: "comment's title",
                        example: "wooow"
                    },
                    body: {
                        type: 'string',
                        description: "comment's body",
                        example: "your post is amazing!!"
                    },
                    image: {
                        type: 'string',
                        description: "comment's image",
                        example: "03.gif"
                    },
                    userId: {
                        type: 'objectId',
                        description: "identification of the user who made the comment",
                        example: "6201064b0028de7866e2b2c4"
                    },
                    postId: {
                        type: 'objectId',
                        description: "identification of the post on which the comment was made",
                        example: "6201064b0028de7866e2b2c4"
                    },
                    likes: [{
                        type: 'objectId',
                        description: "identification of likes on the comment",
                        example: "6201064b0028de7866e2b2c4"
                    }],
                }
            },
            CommentInput: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        description: "comment's title",
                        example: "wooow"
                    },
                    body: {
                        type: 'string',
                        description: "comment's body",
                        example: "your post is amazing!!"
                    },
                    image: {
                        type: 'string',
                        description: "comment's image",
                        example: "03.gif"
                    },
                }
            },
            _id: {
                type: 'objectId',
                description: "An id of a comment",
                example: "6201064b0028de7866e2b2c4"
            },
        }
    }
}