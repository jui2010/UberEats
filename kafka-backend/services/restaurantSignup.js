let Restaurant = require('../models/restaurantModel')

async function handle_request(restaurant, callback){
  console.log("in restaurant signup service")
  console.log("restaurant:" + JSON.stringify(restaurant) )

  const salt = bcrypt.genSalt(10)
  restaurant.password = bcrypt.hash(restaurant.password, salt)

  restaurant = new Restaurant(restaurant)
  
  restaurant.save((err, data) => {
    if(err){
      callback(err, "Error")
    }
    callback(null, data)
  })
}

exports.handle_request = handle_request