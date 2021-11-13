let User = require('../models/userModel')
const jwt = require('jsonwebtoken')

async function handle_request(user, callback){
  console.log("in user login service")
  console.log("user:" + JSON.stringify(user) )
  try{
    await User.findOne({email : user.email, password : user.password}, async(err, userItem) => {
      if(err){
        callback(err, {loginError : "Incorrect email or password"})
      }
      if(userItem){
        const token = jwt.sign({_id : userItem._id }, "dhvbhcvbhd")
        callback(null, token)
      }
      else {
        callback(null, {loginError : "Incorrect email or password"})
      }
    })
  }
  catch(err){
    console.log(err)
  }
}

exports.handle_request = handle_request