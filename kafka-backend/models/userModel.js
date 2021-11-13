const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname : {
        type : String,
        trim : true,
        required :true,
        minlength : 3
    },
    lastname : {
        type : String,
        trim : true,
        required :true,
        minlength : 3
    },
    email : {
        type : String,
        unique : true,
        trim : true,
        required :true,
        minlength : 3
    },
    password : {
        type : String,
        trim : true,
        required :true,
        minlength : 3
    },
    about : {
        type : String,
    },
    profilePicture : {
        type : String,
        trim : true,
    },
    dob : {
        type : Date,
    },
    city : {
        type : String,
    },
    state : {
        type : String,
    },
    country : {
        type : String,
    },
    nickname : {
        type : String,
    },
    phone : {
        type : Number,
    },
},{
    timestamps : true,
    required : true,
})

const User = mongoose.model('User' , userSchema) 

module.exports = User