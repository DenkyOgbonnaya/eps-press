const PostRouter = require('express').Router();
const postCtrl = require('../controllers/postCtrl');

const{createPost, getAllPost, getOnePost, likePost, editPost } = postCtrl;

PostRouter.route('/post')
.post(createPost)
.get(getAllPost)

PostRouter.route('/post/:postSlug')
.get(getOnePost)
PostRouter.route('/post/:postId')
.post(likePost)
.put(editPost)

module.exports = PostRouter