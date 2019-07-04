const PostRouter = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const{isLoggedIn} = require('../middlewares/auth');

const{createPost, getAllPost, getOnePost, likePost, editPost } = postCtrl;

PostRouter.route('/post')
.post(isLoggedIn, createPost)
.get(getAllPost)

PostRouter.route('/post/:postSlug')
.get(getOnePost)
PostRouter.route('/post/:postId')
.post(likePost)
.put(isLoggedIn, editPost)

module.exports = PostRouter