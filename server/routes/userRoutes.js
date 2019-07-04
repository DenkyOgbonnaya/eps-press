const userRouter = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const{ validateUserData, validateLoginData, checkValidationResult} = require('../middlewares/validation');

const{createUser, loginUser} = userCtrl;

userRouter.post('/signup', validateUserData, checkValidationResult, createUser);
userRouter.post('/login', validateLoginData, checkValidationResult, loginUser);

module.exports = userRouter;