var connection = require('../../services/connect');
var encryption = require('../../services/encrypt');
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
        if(this.checkValidation(name, email, mobile, password)) {
            this.connectionObj().then(function(con) {
                this.userObj.find({email: email}, function(err, existingUser) {
                    if (err) {
                        console.error(err);
                        connection.removeConnection(con);
                        res.send(this.responseCodes.error.server.internalError);
                    }
                    else {
                        if(existingUser.length > 0) {
                            res.send({error: 'User is already existing'});
                            connection.removeConnection(con);
                        }
                        else {
                            var user = new this.userObj();
                            user.name = name;
                            user.email = email;
                            user.mobile = mobile;
                            passwordHandler.createHash(password).then(function(hash) {
                                var token = encryption.encrypt(user.email).encryptedData;
                                user.password = hash;
                                user.state = false;
                                user.token = token;
                                user.save(function(err, saveObj) {
                                    if(err){
                                        console.error(err);
                                        connection.removeConnection(con);
                                        res.send(this.responseCodes.error.server.internalError);
                                    }
                                    console.info(`${name} got successfully inserted`);
                                    mailer(email, 'Activation For Todo App', '<a href="http://localhost:8081/app/todo/email/validation/'+ token +'">Please click here to activate your account</a>').then(function(info){
                                        console.info(`Email sent ${info.response}`);
                                        connection.removeConnection(con);
                                        res.send({message: 'Email sent to your mail id. Please check.'});
                                    })
                                    .catch(function(error) {
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
        else {
            res.send({error: 'Server Validation Error'});
        }
    },
    signin: function(req, res) {
        var {email, password} = req.body;
        this.connectionObj().then((con) => {
            this.userObj.findOne({email: email, state: true}, function(err, user) {
                if(err) {
                    console.error(err);
                    connection.removeConnection(con);
                    res.send(this.responseCodes.error.server.internalError);
                }
                if(!user || Object.keys(user).length <= 0) {
                    connection.removeConnection(con);
                    res.send({error: 'Email/Password is incorrect'});
                }
                else {
                    passwordHandler.comparePassword(password, user.password).then(function(result) {
                        if(result) {
                            connection.removeConnection(con);
                            res.send({message: 'Successfully Logged In'});
                        }
                        else {
                            connection.removeConnection(con);
                            res.send({error: 'Email/Password is incorrect'});
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        connection.removeConnection(con);
                        res.send(this.responseCodes.error.server.internalError);
                    });
                }
            })
        })
        .catch((err) => {
            console.error(err);
            res.send(this.responseCodes.error.server.internalError);
        });
    },
    emailValidation: function(req, res) {
        this.connectionObj().then((con) => {
            this.userObj.findOne({token: req.params.token}, function(err, user) {
                if(err) {
                    console.error(err);
                    connection.removeConnection(con);
                    res.send(this.responseCodes.error.server.internalError);
                }
                if(user) {
                    user.state = true;
                    user.save().then((obj) => {
                        console.log(obj);
                        connection.removeConnection(con);
                        res.cookie('user_val' ,'success', { maxAge: 1 * 60 * 60 * 1000});
                        res.redirect('/signin');
                    })
                    .catch((err) => {
                        console.error(err);
                        connection.removeConnection(con);
                        res.send(this.responseCodes.error.server.internalError);
                    });   
                }
                else {
                    connection.removeConnection(con);
                    res.cookie('user_val' ,'expired', { maxAge: 1 * 60 * 60 * 1000});
                    res.redirect('/signup');
                }
            });
        })
        .catch((err) => {
            console.error(err);
            res.send(this.responseCodes.error.server.internalError);
        });
    },
    checkValidation: function(name, email, mobile, password) {
        var validator = true;
        var mobile_pattern=new RegExp('^\\+[0-9]{11,13}$');
        console.log(email);
        var email_pattern=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        for(var arg of arguments) {
            if(arg.length <= 0) {
                validator = false;
            }
        }
        if (password.length <= 7) {
            validator = false;
        }
        if(!mobile_pattern.test(mobile)){
            validator = false;
        }
        if(!email_pattern.test(email)) {
            validator = false;
        }
        return validator;
    }
};

module.exports = new UserAuth();