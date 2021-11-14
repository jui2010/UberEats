let Order = require('../models/orderModel')

async function handle_request(orderid, callback){
  console.log("in cancelOrder service")
  console.log("orderDetails:" + JSON.stringify(orderid) )
  try{
    await Order.findOne({_id : orderid}, async(err, order) => {
      if(err){
        callback(err, {error : "Order not found"})
      }
      if(order){
        order.orderStatus = "cancelled"
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