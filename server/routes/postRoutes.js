const PostRouter = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const{isLoggedIn} = require('../middlewares/auth');
const{ validatePost, checkValidationResult, uploadErrHandler} = require('../middlewares/validation');
const upload = require('../utills/multerConfig')

const{createPost, getAllPost, getOnePost, getPostLikers, likePost, unlikePost, editPost } = postCtrl;

PostRouter.route('/post')
.post(upload.single('image'), isLoggedIn, validatePost, checkValidationResult, createPost)
.get(getAllPost)

PostRouter.route('/post/:postSlug')
.get(getOnePost)
PostRouter.route('/post/:postId')
.put(upload.single('image'), isLoggedIn, validatePost, checkValidationResult, editPost)

PostRouter.route('/post/:postId/likes',)
.post( likePost)
.get(getPostLikers)
.delete(isLoggedIn, unlikePost)


module.exports = PostRouter