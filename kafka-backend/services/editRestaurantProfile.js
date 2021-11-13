let Restaurant = require('../models/restaurantModel')

async function handle_request(updatedRestaurant, callback){
  console.log("in editRestaurantProfile service")
  console.log("restaurant:" + JSON.stringify(updatedRestaurant) )
  try{
    await Restaurant.findOne({_id : updatedRestaurant.restaurantid}, async(err, restaurant) => {
      if(err){
        callback(err, {error : "Restaurant not found"})
      }
      if(restaurant){
        restaurant.restaurantName = updatedRestaurant.restaurantName
        restaurant.phone = updatedRestaurant.phone
        restaurant.location = updatedRestaurant.location
        restaurant.address = updatedRestaurant.address
        restaurant.description = updatedRestaurant.description
        restaurant.deliveryFee = updatedRestaurant.deliveryFee
        restaurant.timing = updatedRestaurant.timing
        restaurant.tile = updatedRestaurant.tile
        restaurant.typeOfRestaurant = updatedRestaurant.typeOfRestaurant
        restaurant.typeOfFood = updatedRestaurant.typeOfFood

        restaurant.save()
          .then(() => callback(null, restaurant) )
          .catch(err => callback(null, {error : "Could not update details"}))
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