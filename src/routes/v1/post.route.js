const express = require('express');
const { postValidation, commentValidation } = require('../../validations');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { postController, commentController } = require('../../controllers');

const router = express.Router();

/**
 * url: http://localhost:3000/v1/posts/
 * admin: all posts create by admin or blogger (disable or enable)
 * blogger: all posts created by himself (disable or enable)
 * user: just seeing posts (enable post)
 */
router
    .route('/')
    .get(auth('getPosts'), validate(postValidation.getPosts), postController.getPosts);

/**
 * url: http://localhost:3000/v1/posts/add
 * admin, blogger: can add a new post, (disable status)
 */
router
    .route('/add')
    .post(auth('managePosts'), validate(postValidation.createPost), postController.createPost);

/**
 * url: http://localhost:3000/v1/posts/:postId
 */
router
    .route('/:postId')
    .get(auth('getPosts'), validate(postValidation.getPost), postController.getPost)
    .delete(auth('managePosts'), validate(postValidation.deletePost), postController.deletePost)
    .patch(auth('managePosts'), validate(postValidation.updatePost), postController.updatePost);

/**
 * TODO:  after
 * url: http://localhost:3000/v1/posts/slug
*/


/**
 * enable or disable post
 * patch: http://localhost:3000/v1/posts/:postId/status?status=[enable/disable]
 * only admin user
 */
router
    .route('/:postId/status')
    .patch(auth('changeStatusPost'), validate(postValidation.changePostStatus), postController.changePostStatus);


//=======================================================================
//========================== Comment Routes =============================
//=======================================================================

router
    .route('/:postId/comment')
    .get(auth('getComment'), validate(commentValidation.getComments), commentController.getComments);

router
    .route('/:postId/comment/add')
    .post(auth('manageComment'), validate(commentValidation.createComment), commentController.createComment);

router
    .route('/:postId/comment/:commentId')
    .get(auth('manageComment'), validate(commentValidation.getComment), commentController.getComment)
    .patch(auth('manageComment'), validate(commentValidation.updateComment), commentController.updateComment)
    .delete(auth('manageComment'), validate(commentValidation.deleteComment), commentController.deleteComment);

router
    .route('/:postId/comment/:commentId/status')
    .get(auth('changeStatusComment'), validate(commentValidation.changeCommentStatus), commentController.changeCommentStatus);

module.exports = router;