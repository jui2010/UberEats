var express = require('express')
var app = express()
var session = require('express-session')

//Cross-Origin-Resource-Sharing
const cors = require('cors')

const {signupUser} = require('./routes/users')
const {loginUser} = require('./routes/users')
const {editProfile} = require('./routes/users')
const {authenticatedUser} = require('./routes/users')
const {getSelectedUser} = require('./routes/users')
const {getAuthenticatedRestaurant} = require('./routes/restaurants')
const {signupRestaurant} = require('./routes/restaurants')
const {loginRestaurant} = require('./routes/restaurants')
const {getAllRestaurants} = require('./routes/restaurants')
const {getRestaurantData} = require('./routes/restaurants')
const {editRestaurantProfile} = require('./routes/restaurants')
const {addDish} = require('./routes/restaurants')
const {getMaxOrderId} = require('./routes/restaurants')
const {createOrder} = require('./routes/restaurants')
const {getOrders} = require('./routes/users')
const {getOrderSummary} = require('./routes/restaurants')
const {changeOrderStatus} = require('./routes/restaurants')
const {addToFavorite} = require('./routes/users')
const {addToUnfavorite} = require('./routes/users')
const {editDish} = require('./routes/restaurants')

var mysql = require('mysql')
var config = require('./config.json')

//cors middleware
app.use(cors())
app.use(express.json()) //since server will send and receive json

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 10 * 60 * 1000,    // Overall duration of Session : 5* 30 minutes : 1800 seconds
    activeDuration      :  60 * 60 * 1000
}))

//specify the path of static directory
app.use(express.static(__dirname + '/public'))

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://3.139.239.167:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
})

//users routes
app.post('/api/signup' , signupUser)
app.post('/api/login' , loginUser)
app.post('/api/edit' , editProfile)
app.post('/api/getAuthenticatedUser' , authenticatedUser)
app.get('/api/getSelectedUser/:userid' , getSelectedUser)
app.post('/api/getAuthenticatedRestaurant' , getAuthenticatedRestaurant)
app.post('/api/restaurantLogin' , loginRestaurant)
app.post('/api/restaurantSignup' , signupRestaurant)
app.post('/api/getAllRestaurants' , getAllRestaurants)
app.get('/api/restaurant/:restaurantName' , getRestaurantData)
app.post('/api/editRestaurantProfile' , editRestaurantProfile)
app.post('/api/addDish' , addDish)
app.get('/api/getMaxOrderId' , getMaxOrderId)
app.post('/api/createOrder' , createOrder)
app.post('/api/getOrders' , getOrders)
app.post('/api/getOrderSummary' , getOrderSummary)
app.post('/api/changeOrderStatus' , changeOrderStatus)
app.post('/api/addToFavorite' , addToFavorite)
app.post('/api/addToUnfavorite' , addToUnfavorite)
app.post('/api/editDish' , editDish)

var con = mysql.createPool({                                                                                                                                                                                                                                    
  host: config.DB.host,
  user: config.DB.username,
  password: config.DB.password,
  port: config.DB.port,
  database: config.DB.database
})

app.listen(5000)
con.getConnection(function(err) {
  if (err) throw err
  console.log("Connected!")
})

module.exports = app