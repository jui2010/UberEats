let Order = require('../models/orderModel')

async function handle_request(orderDetails, callback){
  console.log("in createOrder service")
  console.log("orderDetails:" + JSON.stringify(orderDetails) )
  order = new Order(orderDetails)
  
  order.save((err, data) => {
    if(err){
      callback(err, "Error")
    }
    callback(null, data)
  })
}

exports.handle_request = handle_request