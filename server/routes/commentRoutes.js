const commentRouter = require('express').Router();
const commentCtrl = require('../controllers/commentCtrl');
const{isLoggedIn} = require('../middlewares/auth');
const{ validateReply, validateComment, checkValidationResult} = require('../middlewares/validation');

const{createComment, getOneComment, likeComment, unlikeComment, replyComment, editComment} = commentCtrl;

commentRouter.route('/comment')
.post(isLoggedIn, validateComment, checkValidationResult, createComment)

commentRouter.route('/comment/:commentId')
.get(getOneComment)
.put(isLoggedIn, validateComment, checkValidationResult, editComment)

commentRouter.route('/comment/:id/likes')
.post(isLoggedIn,likeComment)
.delete(isLoggedIn, unlikeComment)


commentRouter.route('/comment/reply/:commentId')
.post(isLoggedIn, validateReply, checkValidationResult, replyComment)

module.exports = commentRouter;