let Restaurant = require('../models/restaurantModel')
let Favorite = require('../models/favoriteModel')

async function handle_request(user, callback){
  console.log("in getAllRestaurants service")
  console.log("user:" + JSON.stringify(user) )
  let userid = user.userid
  try{
    await Restaurant.find(async(err, restaurantArray) => {
      if(err){
        callback(err, {error : "Restaurant not found"})
      }
      if(restaurantArray){
        restaurantArray.forEach(restaurant => {
          Favorite.findOne({restaurantid : restaurant._id, userid : userid })
            .then((favorite) => {
              if(favorite){
                restaurant.fav = 1
              }
            })
            .catch(err => console.log(err))
        })
        callback(null, restaurantArray)
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