let Restaurant = require('../models/restaurantModel')

async function handle_request(restaurant, callback){
  console.log("in restaurant signup service")
  console.log("restaurant:" + JSON.stringify(restaurant) )

  restaurant = new Restaurant(restaurant)
  
  restaurant.save((err, data) => {
    if(err){
      callback(err, "Error")
    }
    callback(null, data)
  })
}

exports.handle_request = handle_request