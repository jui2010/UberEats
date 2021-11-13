const mongoose = require('mongoose')

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    restaurantName : {
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
    address : {
        type : String,  
    },
    password : {
        type : String,
        trim : true,
        required :true,
        minlength : 3
    },
    location : {
        type : String,
    },
    description : {
        type : String,
    },
    phone : {
        type : Number,
    },
    tile : {
        type : String,
    },
    deliveryFee : {
        type : String,
    },
    timing : {
        type : String,
    },
    typeOfRestaurant : {
        type : String,
    },
    typeOfFood : {
        type : String,
    }
},{
    timestamps : true,
    required : true,
})

const Restaurant = mongoose.model('Restaurant' , restaurantSchema) 

module.exports = Restaurant