const express = require('express');
var appRouter = require('./app');
var path = require('path');
var bodyParser = require('body-parser');
const app = express();

function startServer() {    
    var port = process.env.PORT || 8081;

    app.use(function(req, res, next) {
        console.info(req.path + ' ' + new Date());
        next();
    });

    app.use('/', express.static(path.join(__dirname, '../dist/Todo-App')));
    app.use(bodyParser({limit: '50mb'}));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/app', appRouter);

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../dist/Todo-App/index.html'));
    });

    app.listen(port, 
        function() {
            console.info('Todo App listening on port ' + port +'!');
    });
}

module.exports = startServer;