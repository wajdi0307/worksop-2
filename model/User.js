var mongoose = require('mongoose');
const { Schema } = require("mongoose");
// permet de créer l'entity
const stream = require("stream");

var schema = mongoose.Schema;

var User = new Schema({
    Login: String,
    Password: String

})
module.exports = mongoose.model("User", User)