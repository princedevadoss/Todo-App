var database = require('../../config/database');
var mongoose = require('mongoose');

function TODOConnection() {
    this.connection = this.createConnection();
}

TODOConnection.prototype = {
    createConnection: function() {
        if(!this.connection) {
            return mongoose.connect(database.connection_string, database.options);
        }
        return this.connection;
    },
    removeConnection: function(connectObj) {
        try {
            connectObj.disconnect();
        }
        catch(err) {
            console.error(err);
        }
    }
}

module.exports = new TODOConnection();