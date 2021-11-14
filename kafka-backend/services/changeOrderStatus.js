let Order = require('../models/orderModel')

async function handle_request(orderDetails, callback){
  console.log("in getOrderSummary service")
  try{
    await Order.findOne({_id : orderDetails.orderid}, async(err, order) => {
      if(err){
        callback(err, {error : "Order not found"})
      }
      if(order){
        order.orderStatus = orderDetails.orderStatus
        order.save()
          .then(() => callback(null, order) )
          .catch(err => callback(null, {error : "Error"}))
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