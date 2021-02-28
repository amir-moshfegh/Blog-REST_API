const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const { Comment } = require('../models');
const { status } = require('../config/enums');

/**
 * create new comment
 * @param {Object} commentBody 
 * @returns {Promise <Comment>}
 */
const createComment = async (commentBody) => {
    const comment = await Comment.create(commentBody);
    return comment;
};

/**
 * get comment with Id
 * @param {Object} commentBody 
 * @returns {Promise <Comment>}
 */
const getCommentById = async (id) => {
    return Comment.findById(id);
};

/**
 * query to comment 
 * @param {Object} filter 
 * @param {Object} options 
 * @returns {Promise <Comment>}
 */
const queryComment = async (filter, options) => {
    const comments = await Comment.paginate(filter, options);
    return comments;
};

/**
 * Delete comment by Id
 * @param {ObjectId} commentId 
 * @returns {Promise <Comment>}
 */
const deleteCommentById = async (commentId) => {
    const comment = getCommentById(commentId);
    if (!comment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'comment not found!');
    }

    await comment.remove();
    return comment;
};

/**
 * update comment by Id
 * @param {ObjectId} commentId 
 * @param {Object} updateBody 
 * @returns {Promise <Comment>}
 */
const updateCommentById = async (commentId, updateBody) => {
    const comment = getCommentById(commentId);
    if (!comment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'comment not found!');
    }

    Object.assign(comment, updateBody);
    await comment.save();
    return comment;

};

/**
 * change comment status
 * @param {ObjectId} commentId 
 * @param {Query} statusQuery 
 * @returns {Promise <comment> }
 */
const changeCommentStatus = async (commentId, statusQuery) => {
    const comment = getCommentById(commentId);
    if (!comment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'comment not found!');
    }
    const statusNew = (statusQuery === status.ENABLE || statusQuery === status.DISABLE) ? statusQuery : "";

    if (!statusNew) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'bad request!');
    }

    post.status = statusNew;
    await post.save();
    return post;

}

module.exports = {
    createComment,
    getCommentById,
    queryComment,
    deleteCommentById,
    updateCommentById,
    changeCommentStatus,
}