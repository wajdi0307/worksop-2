var mongoose = require('mongoose');
const {Schema} = require("mongoose");
// permet de créer l'entity
const stream = require("stream");

var schema = mongoose.Schema;

var Contact = new Schema({
    FullName:String,
    Phone:Number

})
module.exports = mongoose.model("contact", Contact)