const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        content: Joi.string(),
        tags: Joi.array(),
        user: Joi.string().custom(objectId),
    }),
};

const updatePost = {
    params: Joi.object().keys({
        postId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        title: Joi.string(),
        content: Joi.string(),
        tags: Joi.array(),
        status: Joi.string(),
    })
        .min(1),
};

const deletePost = {
    params: Joi.object().keys({
        postId: Joi.string().custom(objectId),
    }),
};

const getPost = {
    params: Joi.object().keys({
        postId: Joi.string().custom(objectId),
    }),
};

const getPosts = {
    query: Joi.object().keys({
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const changePostStatus = {
    params: Joi.object().keys({
        postId: Joi.string().custom(objectId),
    }),
    query: Joi.object().keys({
        status: Joi.string(),
    })
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts,
    changePostStatus,
}

