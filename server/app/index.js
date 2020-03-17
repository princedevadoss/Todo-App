var APP_ROUTER = require('express').Router();
var user = require('./user');
var basic = require('./basic');

APP_ROUTER.use('/todo', user);
APP_ROUTER.use('/todo', basic);

module.exports = APP_ROUTER;
