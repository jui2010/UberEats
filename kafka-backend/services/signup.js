let User = require('../models/userModel')

async function handle_request(user, callback){
  console.log("in user signup service")
  console.log("user:" + JSON.stringify(user) )

  user = new User(user)
  
  user.save((err, data) => {
    if(err){
      callback(err, "Error")
    }

    callback(null, data)
  })
}

exports.handle_request = handle_request