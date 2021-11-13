let User = require('../models/userModel')

async function handle_request(userid, callback){
  console.log("in getAuthenticatedUserData service")
  console.log("user:" + JSON.stringify(userid) )
  try{
    await User.findOne({_id : userid}, async(err, user) => {
      if(err){
        callback(err, {error : "User not found"})
      }
      if(user){
        callback(null, user)
      }
      else {
        callback(null, {error : "User not found"})
      }
    })
  }
  catch(err){
    console.log(err)
  }
}

exports.handle_request = handle_request