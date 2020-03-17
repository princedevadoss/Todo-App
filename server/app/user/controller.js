var connection = require('../../services/connect');
var passwordHandler = require('../../services/password-handler');
var mailer = require('../../services/mail');
var users = require('../../services/model/users');
var constants = require('../../services/constants');

function UserAuth() {
    this.userObj = users;
    this.connectionObj = connection.createConnection;
    this.responseCodes = constants.responseCodes;
}

UserAuth.prototype = {
    signup: function(req, res) {
        var {name, email, mobile, password} = req.body;
        this.connectionObj().then(function(con) {
            this.userObj.find({email: email}, function(err, existingUser) {
                if (err) {
                    console.error(err);
                    connection.removeConnection(con);
                    res.send(this.responseCodes.error.server.internalError);
                }
                else {
                    if(existingUser.length > 0) {
                        res.send({message: 'User is already existing'});
                        connection.removeConnection(con);
                    }
                    else {
                        var user = new this.userObj();
                        user.name = name;
                        user.email = email;
                        user.mobile = mobile;
                        passwordHandler.createHash(password).then(function(hash) {
                            user.password = hash;
                            user.state = false;
                            user.save(function(err, saveObj) {
                                if(err){
                                    console.error(err);
                                    connection.removeConnection(con);
                                    res.send(this.responseCodes.error.server.internalError);
                                }
                                console.info(`${name} got successfully inserted`);
                                mailer(email, 'Testing Signup', 'Test Message').then(function(info){
                                    console.info(`Email sent ${info.response}`);
                                    connection.removeConnection(con);
                                    res.send({message: 'Email sent to your mail id. Please check.'});
                                })
                                .catch(function() {
                                    console.error(error);
                                    connection.removeConnection(con);
                                    res.send(this.responseCodes.error.server.internalError);
                                }.bind(this));
                            }.bind(this));
                        }.bind(this))
                        .catch(function(error) {
                            console.error(error);
                            connection.removeConnection(con);
                            res.send(this.responseCodes.error.server.internalError);
                        });
                    }
                }
            }.bind(this));
        }.bind(this))
        .catch(function(error) {
            console.error(error);
            res.send(this.responseCodes.error.server.internalError);
        });
    }
};

module.exports = new UserAuth();