var basicRouter = require('express').Router();
var basicController = require('./controller');

basicRouter.get('/check', basicController.check.bind(basicController));

module.exports = basicRouter;