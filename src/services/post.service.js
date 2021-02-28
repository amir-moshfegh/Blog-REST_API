const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const { Post } = require('../models');
const { status } = require('../config/enums');

/**
 * get post by id and status is enable
 * @param {ObjectId} id 
 * @returns {Promise<Post>}
 */
const getPostById = async (id) => {
    return Post.findById(id);
}

/**
 * update post by Id
 * @param {ObjectId} postId 
 * @param {Object} updateBody 
 * @returns {Promise<Post>}
 */
const updatePostById = async (postId, updateBody) => {
    const post = await getPostById(postId);
    if (!post) {
        throw new ApiError(httpStatus.NOT_FOUND, 'post not found.');
    }
    Object.assign(post, updateBody);
    await post.save();
    return post;
}

/**
 * change status post to enable
 * @param {ObjectId} postId 
 * @returns {Promise<Post>}
 */
const changePostStatus = async (postId, statusQuery) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(httpStatus.NOT_FOUND, 'post not found');
    }
    const statusNew = (statusQuery === status.ENABLE || statusQuery === status.DISABLE) ? statusQuery: "";

    if(!statusNew){
        throw new ApiError(httpStatus.BAD_REQUEST, 'bad request!');
    }
    
    post.status = statusNew;
    await post.save();
    return post;
}

/**
 * delete post by Id
 * @param {ObjectId} postId 
 * @returns {Promise<Post>}
 */
const deletePostById = async (postId) => {
    const post = await getPostById(postId);
    if (!post) {
        throw new ApiError(httpStatus.NOT_FOUND, 'post not found.');
    }

    await post.remove();
    return post;
}

/**
 * query posts
 * @param {Object} filter 
 * @param {Object} options 
 * @returns {Promise<Post>}
 */
const queryPosts = async (filter, options) => {
    const posts = await Post.paginate(filter, options);
    return posts;
}

/**
 * create new post
 * @param {Object} postBody 
 * @returns {Promise<Post>}
 */
const createPost = async (postBody) => {
    const post = await Post.create(postBody);
    return post;
}


module.exports = {
    getPostById,
    updatePostById,
    deletePostById,
    queryPosts,
    createPost,
    changePostStatus,
}