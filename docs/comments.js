module.exports = {
    paths: {
        "/comments": {
            get: {
                security: [{
                    ApiKeyAuth: []
                }],
                tags: ["Comments"],
                summary: "Get all comments",
                description: "Get comments",
                operationId: "getComment",
                parameters: [],
                responses: {
                    200: {
                        description: "Comments were obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/comments",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/comments/idpost/{_id}": {
            post: {
                security: [{
                    ApiKeyAuth: []
                }],
                tags: ["Comments"],
                summary: "Create Comment",
                description: "Create Comment",
                operationId: "createComment",
                parameters: [{
                    name: "_id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/_id",
                    },
                    description: "Id of Post",
                }],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                $ref: "#/components/schemas/CommentInput"
                            },
                            encoding: {
                                image: {
                                    contentType: ["image/png", "image/jpg", "image/gif"]
                                },
                            }
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Comment created successfully"
                    },
                    500: {
                        description: "Server error"
                    },
                },
            },
        },
        "/comments/idcomment/{_id}": {
            put: {
                security: [{
                    ApiKeyAuth: []
                }],
                tags: ["Comments"],
                summary: "Update Comment",
                description: "Update Comment",
                operationId: "updateComment",
                parameters: [{
                    name: "_id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/_id",
                    },
                    description: "Id of Comment to be updated",
                }, ],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: { $ref: "#/components/schemas/CommentInput" },
                        },
                    },
                },
                responses: {
                    200: { description: "Comment updated successfully" },
                    404: { description: "Comment not found" },
                    500: { description: "Server error" },
                },


            },

        },
        "/comments/id/{_id}": {

            delete: {
                security: [{
                    ApiKeyAuth: []
                }],
                tags: ["Comments"],
                summary: "Delete Comment",
                description: "Deleting a Comment",
                operationId: "deleteComment",
                parameters: [{
                    name: "_id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/_id",
                    },
                    description: "Deleting a done Comment",
                }, ],
                responses: {
                    200: { description: "Comment deleted successfully" },
                    404: { description: "Comment not found" },
                    500: { description: "Comment error" },
                },
            },
        },
    },
}