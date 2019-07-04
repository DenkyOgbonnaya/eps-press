const { check, validationResult } = require('express-validator/check');

module.exports.validateUserData= validateUserData = [
    check('username', 'username is required').isLength({min: 3}),
    check('email', 'valid email  is required').isEmail(),
    check('password', 'password is required').isLength({min: 3})
]
//validate login data
module.exports.validateLoginData = validateLoginData = [
    check('username', 'username is required').isLength({min: 3}),
    check('password', 'password is required').isLength({min: 3})
]
//validate post data
module.exports.validatePost = validatePost = [
    check('title', 'title is required').isLength({min: 3}),
    check('content', 'content  is required').isLength({min: 3})
]
//validate comment data
module.exports.validateComment = validateComment = [
    check('comment', 'comment is required').isLength({min: 3}),
]
//validate reply 
module.exports.validateReply = validateReply = [
    check('reply', 'reply is required').isLength({min: 3}),
]
module.exports.checkValidationResult = checkValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty())
        return res.status(400).send({message: result.array()[0].msg})
    next();
}