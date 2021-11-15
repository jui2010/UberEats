let Restaurant = require('../models/restaurantModel')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

async function handle_request(restaurant, callback){
  console.log("in restaurant login service")
  console.log("restaurant:" + JSON.stringify(restaurant) )
  try{
    await Restaurant.findOne({email : restaurant.email}, async(err, restaurantItem) => {
      if(err){
        callback(err, {loginRestError : "Email not found"})
      }
      if( bcrypt.compare(restaurant.password, restaurantItem.password)){
        const token = jwt.sign({_id : restaurantItem._id }, "dhvbhcvbhd")
        callback(null, token)
      }
      else {
        callback(null, {loginRestError : "Incorrect email or password"})
      }
    })
  }
  catch(err){
    console.log(err)
  }
}

exports.handle_request = handle_request