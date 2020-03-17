var userRouter = require('express').Router();
var userController = require('./controller');

userRouter.post('/signup', userController.signup.bind(userController));

module.exports = userRouter;