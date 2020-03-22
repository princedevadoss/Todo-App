var mongoose = require('mongoose');

let Schema = mongoose.Schema;
let usersSchema = new Schema({
    name: String,
    email: String,
    mobile: String,
    password: String,
    state: Boolean,
    token: String
});
module.exports = mongoose.model('users', usersSchema);