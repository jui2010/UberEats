var connection =  new require('./kafka/Connection')
const mongoose = require('mongoose')

//Configuring Environment Variables
require('dotenv').config()

const uri = process.env.ATLAS_URI

//Mongo Connection
const connectDB = async () => {
  try {
    await mongoose.connect( uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxpoolSize:500
    })
    console.log("MongoDB connected successfully")
  } catch (err) {
    console.log("Could not connect to MongoDB", err)
  }
}
connectDB()

//topics files
//user
var Signup = require('./services/signup.js')
var Login = require('./services/login.js')

//authUser
var GetAuthenticatedUserData = require('./services/getAuthenticatedUserData.js')
// var EditProfile = require('./services/editProfile.js')
// var AddToFavorite = require('./services/addToFavorite.js')
// var AddToUnfavorite = require('./services/addToUnfavorite.js')
// var CreateOrder = require('./services/createOrder.js')
// var CancelOrder = require('./services/cancelOrder.js')
// var GetOrders = require('./services/getOrders.js')

// //restaurant
var RestaurantSignup = require('./services/restaurantSignup.js')
var RestaurantLogin = require('./services/restaurantLogin.js')
var GetSelectedRestaurantData = require('./services/getSelectedRestaurantData.js')
var GetAllRestaurants = require('./services/getAllRestaurants.js')

//authRestaurant
var GetAuthenticatedRestaurantData = require('./services/getAuthenticatedRestaurantData.js')
var EditRestaurantProfile = require('./services/editRestaurantProfile.js')
// var AddDish = require('./services/addDish.js')
// var EditDish = require('./services/editDish.js')
// var GetOrderSummary = require('./services/getOrderSummary.js')
// var ChangeOrderStatus = require('./services/changeOrderStatus.js')

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic'
    var consumer = connection.getConsumer(topic_name)
    var producer = connection.getProducer()
    console.log('server is running ')
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname)
        console.log(JSON.stringify(message.value))
        var data = JSON.parse(message.value)
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res)
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ]
            producer.send(payloads, function(err, data){
                console.log(data)
            })
            return
        })
        
    })
}

//topics handlers list
//user
handleTopicRequest("signup", Signup) 
handleTopicRequest("login", Login) 

//authUser
handleTopicRequest("getAuthenticatedUserData", GetAuthenticatedUserData)
// handleTopicRequest("editProfile", EditProfile)
// handleTopicRequest("addToFavorite", AddToFavorite)
// handleTopicRequest("addToUnfavorite", AddToUnfavorite) 
// handleTopicRequest("createOrder", CreateOrder)
// handleTopicRequest("cancelOrder", CancelOrder)
// handleTopicRequest("getOrders", GetOrders)

//restaurant
handleTopicRequest("restaurantSignup", RestaurantSignup)
handleTopicRequest("restaurantLogin", RestaurantLogin)
handleTopicRequest("getSelectedRestaurantData", GetSelectedRestaurantData)
handleTopicRequest("getAllRestaurants", GetAllRestaurants) 

//authRestaurant
handleTopicRequest("getAuthenticatedRestaurantData", GetAuthenticatedRestaurantData)
handleTopicRequest("editRestaurantProfile", EditRestaurantProfile)
// handleTopicRequest("addDish", AddDish)
// handleTopicRequest("editDish", EditDish)
// handleTopicRequest("getOrderSummary", GetOrderSummary)
// handleTopicRequest("changeOrderStatus", ChangeOrderStatus)