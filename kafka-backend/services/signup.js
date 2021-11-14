let User = require('../models/userModel')
const bcrypt = require("bcryptjs")

async function handle_request(user, callback){
  console.log("in user signup service")
  const salt = bcrypt.genSalt(10)
  user.password = bcrypt.hash(user.password, salt)

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