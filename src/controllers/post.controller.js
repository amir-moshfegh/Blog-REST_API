const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { postService, userService } = require('../services');
const { status, roles } = require('../config/enums');

const createPost = catchAsync(async (req, res) => {
    const post = await postService.createPost({
        ...req.body,
        user: req.user.id,
    });
    res.status(httpStatus.CREATED).send(post);
});

const updatePost = catchAsync(async (req, res) => {
    const post = await postService.updatePostById(req.params.postId, req.body);
    res.send(post);
});

const deletePost = catchAsync(async (req, res) => {
    await postService.deletePostById(req.params.postId);
    res.status(httpStatus.NO_CONTENT).send();
});

const getPost = catchAsync(async (req, res) => {
    const post = await postService.getPostById(req.params.postId);

    if (!post) {
        throw new ApiError(httpStatus.NOT_FOUND, 'post not found');
    }
    
    const user = await userService.getUserById(post.user);

    res.send({
        post,
        user,
    });
});

const getPosts = catchAsync(async (req, res) => {

    let filter = {};
    // admin: all posts create by admin or blogger (disable or enable)
    if (req.user.role === roles.ADMIN) {
        filter = { $or: [{ 'status': status.ENABLE }, { 'status': status.DISABLE }] };
    }

    // blogger: all posts created by yourself (disable or enable)
    if (req.user.role === roles.BLOGGER) {
        filter = {
            $and: [
                { $or: [{ 'status': status.DISABLE }, { 'status': status.ENABLE }] },
                { 'user': req.user.id }
            ]
        };
    }

    // user: just seeing posts (enable post)
    if (req.user.role === roles.USER) {
        filter = { 'status': status.ENABLE };
    }

    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await postService.queryPosts(filter, options);
    res.send(result);
});

const changePostStatus = catchAsync(async (req, res) => {
    const post = await postService.changePostStatus(req.params.postId, req.query.status);
    res.send(post);
});

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts,
    changePostStatus,
}