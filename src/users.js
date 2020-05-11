const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nomUser:String,
    prenom:String,
    nom:String
})

const User = mongoose.model('user', UserSchema);

module.exports = User;
