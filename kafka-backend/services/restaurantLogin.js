let Restaurant = require('../models/restaurantModel')
const jwt = require('jsonwebtoken')

async function handle_request(restaurant, callback){
  console.log("in restaurant login service")
  console.log("restaurant:" + JSON.stringify(restaurant) )
  try{
    await Restaurant.findOne({email : restaurant.email, password : restaurant.password}, async(err, restaurantItem) => {
      if(err){
        callback(err, {loginError : "Incorrect email or password"})
      }
      if(restaurantItem){
        const token = jwt.sign({_id : restaurantItem._id }, "dhvbhcvbhd")
        callback(null, token)
      }
      else {
        callback(null, {loginError : "Incorrect email or password"})
      }
    })
  }
  catch(err){
    console.log(err)
  }
}

exports.handle_request = handle_request