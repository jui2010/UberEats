const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    restaurantid : {
        type : String,
        trim : true,
        required :true
    },
    restaurantName : {
        type : String,
        required :true
    },
    location : {
        type : String,
        required :true
    },
    userid : {
        type : String,
        trim : true,
        required :true
    },
    firstname : {
        type : String,
        required :true
    },
    lastname : {
        type : String,
        trim : true
    },
    deliveryOrPickup : {
        type : String,
    },
    orderStatus : {
        type : String,
    },
    dishes : {
        type : Array,
    },
    orderDate : {
        type : Date,
    },
    orderTime : {
        type : String,
    }
},{
    timestamps : true,
    required : true,
})

const Order = mongoose.model('Order' , orderSchema) 

module.exports = Order