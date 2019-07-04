const userRouter = require('express').Router();
const userCtrl = require('../controllers/userCtrl');

const{createUser, loginUser} = userCtrl;

userRouter.post('/signup', createUser);
userRouter.post('/login', loginUser);

module.exports = userRouter;