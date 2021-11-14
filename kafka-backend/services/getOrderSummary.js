let Order = require('../models/orderModel')

async function handle_request(restaurantid, callback){
  console.log("in getOrderSummary service")
  try{
    await Order.find({restaurantid : restaurantid}, async(err, orderArray) => {
      if(err){
        callback(err, {error : "Order not found"})
      }
      if(orderArray){
        callback(null, orderArray)
      }
      else {
        callback(null, {error : "Order not found"})
      }
    })
  }
  catch(err){
    console.log(err)
  }
}

exports.handle_request = handle_request