let Favorite = require('../models/favoriteModel')

async function handle_request(favDetails, callback){
  console.log("in addToFavorite service")
  console.log("favDetails:" + JSON.stringify(favDetails) )
  favorite = new Favorite(favDetails)
  
  favorite.save((err, data) => {
    if(err){
      callback(err, "Error")
    }
    callback(null, data)
  })
}

exports.handle_request = handle_request