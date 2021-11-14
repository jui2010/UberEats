let Favorite = require('../models/favoriteModel')

async function handle_request(unfavorite, callback){
  console.log("in addToFavorite service")
  console.log("addToUnfavorite:" + JSON.stringify(unfavorite) )
  try{
    await Favorite.deleteMany({userid : unfavorite.userid, restaurantid : unfavorite.restaurantid}, async(err, unfav) => {
      if(err){
        callback(err, {error : "Favorite not found"})
      }
      if(unfav){
        callback(null, {success : "Favorite deleted"})
      }
      else {
        callback(null, {error : "Favorite not found"})
      }
    })
  }
  catch(err){
    console.log(err)
  }
}

exports.handle_request = handle_request