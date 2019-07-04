const commentRouter = require('express').Router();
const commentCtrl = require('../controllers/commentCtrl');

const{createComment, getOneComment, likeComment, replyComment, editComment} = commentCtrl;

commentRouter.route('/comment')
.post(createComment)

commentRouter.route('/comment/:commentId')
.get(getOneComment)
.post(likeComment)
.put(editComment)

commentRouter.route('/comment/:commentId/reply')
.post(replyComment)

module.exports = commentRouter;