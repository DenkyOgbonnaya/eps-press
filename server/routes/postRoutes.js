const PostRouter = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const{isLoggedIn} = require('../middlewares/auth');
const{ validatePost, checkValidationResult} = require('../middlewares/validation');

const{createPost, getAllPost, getOnePost, likePost, editPost } = postCtrl;

PostRouter.route('/post')
.post(isLoggedIn, validatePost, checkValidationResult, createPost)
.get(getAllPost)

PostRouter.route('/post/:postSlug')
.get(getOnePost)
PostRouter.route('/post/:postId')
.post(likePost)
.put(isLoggedIn, validatePost, checkValidationResult, editPost)

module.exports = PostRouter