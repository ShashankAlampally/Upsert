const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname : {type : 'string', required: true},
    lastname : {type : 'string', required: true},
    email : {type : 'string', required: true, unique: true},
    password : {type : 'string', required: true}
},{timestamps:true})

module.exports = mongoose.model("userSchema",userSchema);