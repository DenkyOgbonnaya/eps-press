const userRouter = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const{usernameExist, emailExist} = require('../middlewares/auth');
const{ validateUserData, validateLoginData, checkValidationResult} = require('../middlewares/validation');

const{createUser, loginUser} = userCtrl;

userRouter.post('/signup', validateUserData, checkValidationResult, usernameExist, emailExist, createUser);
userRouter.post('/login', validateLoginData, checkValidationResult, loginUser);

module.exports = userRouter;