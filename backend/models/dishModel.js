const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dishSchema = new Schema({
    restaurantid : {
        type : String,
        trim : true,
        required :true
    },
    dishName : {
        type : String,  
    },
    dishPrice : {
        type : String,
    },
    dishDescription : {
        type : String,
    },
    dishCategory : {
        type : String,
    },
    dishPicture : {
        type : String,
    },
    dishType : {
        type : String,
    },
    cuisine : {
        type : String,
    }
},{
    timestamps : true,
    required : true,
})

const Dish = mongoose.model('Dish' , dishSchema) 

module.exports = Dish