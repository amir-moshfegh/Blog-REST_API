const { commentService, postService } = require('../services');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { status } = require('../config/enums');

const createComment = catchAsync(async (req, res) => {
    // add comment for enable posts
    const post = await postService.getPostById(req.params.postId);
    if (post.status !== status.ENABLE) {
        throw new ApiError(httpStatus.FORBIDDEN, 'forbidden!, this post is not enable');
    }

    const comment = await commentService.createComment({
        ...req.body,
        user: req.user.id,
        post: req.params.postId,
    });

    res.status(httpStatus.CREATED).send(comment);
});

const getComment = catchAsync(async (req, res) => {
    const comment = await commentService.getCommentById(req.params.commentId);
    if (!comment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'not found!');
    }
    console.log('this');
    res.send(comment);
});

const getComments = catchAsync(async (req, res) => {
    const filter = {};
    const options = {};
    const result = await commentService.queryComment(filter, options);
    res.send(result);
});

const deleteComment = catchAsync(async (req, res) => {
    await commentService.deleteCommentById(req.param.id);
    res.status(httpStatus.NO_CONTENT).send();
});

const updateComment = catchAsync(async (req, res) => {
    const comment = await commentService.updateCommentById(req.param.commentId, req.body);
    res.send(comment);
});

const changeCommentStatus = catchAsync(async (req, res) => {
    const post = await commentService.changeCommentStatus(req.params.commentId, req.query.status);
    res.send(post);
});

module.exports = {
    createComment,
    getComment,
    getComments,
    deleteComment,
    updateComment,
    changeCommentStatus,
}