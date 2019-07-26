const commentRouter = require('express').Router();
const commentCtrl = require('../controllers/commentCtrl');
const{isLoggedIn, isAdmin,} = require('../middlewares/auth');
const{ validateReply, validateComment, checkValidationResult} = require('../middlewares/validation');

const{createComment, getOneComment, likeComment, unlikeComment, replyComment, editComment} = commentCtrl;

commentRouter.route('/comment')
.post(isLoggedIn, validateComment, checkValidationResult, createComment)

commentRouter.route('/comment/:commentId')
.post(isLoggedIn, validateReply, checkValidationResult, replyComment)
.get(getOneComment)
.put(isLoggedIn, validateComment, checkValidationResult, editComment)
.delete(isLoggedIn, isAdmin)

commentRouter.route('/comment/:id/likes')
.post(isLoggedIn,likeComment)
.delete(isLoggedIn, unlikeComment)

module.exports = commentRouter;