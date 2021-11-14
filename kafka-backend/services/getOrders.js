let Order = require('../models/orderModel')
let Restaurant = require('../models/restaurantModel')

async function handle_request(userid, callback){
  console.log("in getOrders service")
  try{
    await Order.find({userid : userid}, async(err, orderArray) => {
      if(err){
        callback(err, {error : "Order not found"})
      }
      if(orderArray){
        orderArray.forEach(order => {
          Restaurant.findById(order.restaurantid)
            .then((restaurant) => {
              order = {
                ...order._doc
              }
              order = {
                ...order,
                restaurantName : restaurant.restaurantName,
                location : restaurant.location
              }
            })
            .catch(err => callback(null, {error : "Restaurant not found"}))
        })
        callback(null, orderArray )
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