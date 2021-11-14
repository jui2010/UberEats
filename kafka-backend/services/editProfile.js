let User = require('../models/userModel')

async function handle_request(userDetails, callback){
  console.log("in editProfile service")
  console.log("user:" + JSON.stringify(userDetails) )
  try{
    await User.findOne({_id : userDetails.userid}, async(err, user) => {
      if(err){
        callback(err, {error : "User not found"})
      }
      if(user){
        user.email = userDetails.email
        user.phone  = userDetails.phone
        user.nickname = userDetails.nickname
        user.dob = userDetails.dob
        user.about = userDetails.about
        user.city = userDetails.city
        user.state = userDetails.state
        user.country = userDetails.country

        user.save()
          .then(() => callback(null, user) )
          .catch(err => callback(null, {error : "Could not update details"}))
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