let Restaurant = require('../models/restaurantModel')
let Dish = require('../models/dishModel')

async function handle_request(msg, callback){
  console.log("in getSelectedRestaurantData service")
  console.log("user:" + JSON.stringify(msg) )

  try{
    await Restaurant.findOne({restaurantName : msg.restaurantName}, async(err, restaurant) => {
      if(err){
        callback(err, {error : "Restaurant not found"})
      }
      if(restaurant){
        Dish.find({restaurantid : restaurant._id})
          .then((dishesArray) => {
            restaurant = {
              ...restaurant._doc,
              dishes : dishesArray
            }
            callback(null, restaurant)
          })
          .catch(err => res.status(400).json({ error : err}) )
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