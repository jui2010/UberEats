let Restaurant = require('../models/restaurantModel')

async function handle_request(restaurantid, callback){
  console.log("in getAuthenticatedRestaurantData service")
  console.log("restaurant:" + JSON.stringify(restaurantid) )
  try{
    await Restaurant.findOne({_id : restaurantid}, async(err, restaurant) => {
      if(err){
        callback(err, {error : "Restaurant not found"})
      }
      if(restaurant){
        callback(null, restaurant)
      }
      else {
        callback(null, {error : "Restaurant not found"})
      }
    })
  }
  catch(err){
    console.log(err)
  }
}

exports.handle_request = handle_request