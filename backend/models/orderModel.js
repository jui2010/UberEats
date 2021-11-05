const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    restaurantid : {
        type : String,
        trim : true,
        required :true
    },
    userid : {
        type : String,
        trim : true,
        required :true
    },
    dishid : {
        type : String,
        trim : true,
        required :true
    },
    dishQuantity : {
        type : String,  
    },
    dishPrice : {
        type : String,
    },
    deliveryOrPickup : {
        type : String,
    },
    orderStatus : {
        type : String,
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