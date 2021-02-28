const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createComment = {
    params: Joi.object().keys({
        postId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        content: Joi.string(),
    })
};

const getComment = {
    params: Joi.object().keys({
        postId: Joi.string().custom(objectId),
        commentId: Joi.string().custom(objectId),
    })
};

const getComments = {
    query: Joi.object().keys({
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
};

const deleteComment = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    })
};

const updateComment = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
        content: Joi.string()
    })
        .min(1)
};

const changeCommentStatus = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createComment,
    getComment,
    getComments,
    deleteComment,
    updateComment,
    changeCommentStatus,
}