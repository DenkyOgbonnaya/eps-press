const commentRouter = require('express').Router();
const commentCtrl = require('../controllers/commentCtrl');
const{isLoggedIn} = require('../middlewares/auth');

const{createComment, getOneComment, likeComment, replyComment, editComment} = commentCtrl;

commentRouter.route('/comment')
.post(isLoggedIn, createComment)

commentRouter.route('/comment/:commentId')
.get(getOneComment)
.post(likeComment)
.put(isLoggedIn, editComment)

commentRouter.route('/comment/:commentId/reply')
.post(isLoggedIn, replyComment)

module.exports = commentRouter;