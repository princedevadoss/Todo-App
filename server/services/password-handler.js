var bcrypt = require('bcrypt');

var salt_rounds = 10;

function createHash(password) {
    return bcrypt.hash(password, salt_rounds).then(function(hash) {
        return hash;
    })
    .catch(function(err) {
        return err;
    });
}

function comparePassword(srcString, hash) {
    return bcrypt.compare(srcString, hash).then(function(result) {
       return result; 
    });
}

module.exports = {
    createHash: createHash,
    comparePassword: comparePassword
}