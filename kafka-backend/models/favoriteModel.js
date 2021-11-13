const mongoose = require('mongoose')

const Schema = mongoose.Schema

const favoriteSchema = new Schema({
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
    fav : {
        type : Number,
        required :true
    }
},{
    timestamps : true,
    required : true,
})

const Favorite = mongoose.model('Favorite' , favoriteSchema) 

module.exports = Favorite