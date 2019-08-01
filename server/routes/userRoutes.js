const userRouter = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const{usernameExist, emailExist, isLoggedIn} = require('../middlewares/auth');
const{ validateUserData, validateLoginData, checkValidationResult} = require('../middlewares/validation');
const{getUserPost} = require('../controllers/postCtrl')
const{createUser, loginUser, verifyToken, changeAvatar, getUserProfile} = userCtrl;
const upload = require('../utills/multerConfig')

userRouter.post('/signup', validateUserData, checkValidationResult, usernameExist, emailExist, createUser);
userRouter.post('/login', validateLoginData, checkValidationResult, loginUser);
userRouter.get('/verify/:token', verifyToken)
userRouter.route('/:userId/post')
.get(getUserPost)
userRouter.put('/:id/avatar', upload.single('image'),changeAvatar)
userRouter.get('/:username/profile', isLoggedIn, getUserProfile);
module.exports = userRouter;