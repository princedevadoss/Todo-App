var userRouter = require('express').Router();
var userController = require('./controller');

userRouter.post('/signup', userController.signup.bind(userController));
userRouter.post('/signin', userController.signin.bind(userController));
userRouter.get('/email/validation/:token', userController.emailValidation.bind(userController));

module.exports = userRouter;