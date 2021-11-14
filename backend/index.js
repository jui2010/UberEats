//import the require dependencies
var express = require('express')
const mongoose = require("mongoose")
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var kafka = require('./kafka/client')
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://18.117.128.170:8080', credentials: true }))
app.use(bodyParser.json())

//Configuring Environment Variables
require('dotenv').config()

const mongoAuth = require('./routes/mongoAuth')
const mongoRestAuth = require('./routes/mongoRestAuth')

const uri = process.env.ATLAS_URI

//Mongo Connection
const connectDB = async () => {
    try {
      await mongoose.connect( uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log("MongoDB connected successfully")
    } catch (err) {
      console.log("Could not connect to MongoDB", err)
    }
  }
  
  connectDB()

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://18.117.128.170:8080')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
    res.setHeader('Cache-Control', 'no-cache')
    next()
  })

app.post('/api/user/signup', function(req, res){
    console.log("in user signup backend")
    kafka.make_request('signup',req.body, function(err,results){
        console.log('in result')
        console.log(results)
        if (err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json({
                updatedList:results
            })
            res.end()
        }
    })
})

app.post('/api/user/login', async function(req, res){
    console.log("in user login backend")
    await kafka.make_request('login',req.body, function(err,results){
        console.log('in result')
        console.log(results)
        if (err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.post('/api/restaurant/restaurantSignup', function(req, res){
    console.log("in restaurantSignup backend")
    kafka.make_request('restaurantSignup',req.body, function(err,results){
        console.log('in result')
        console.log(results)
        if (err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json({
                updatedList:results
            })
            res.end()
        }
    })
})

app.post('/api/restaurant/restaurantLogin', async function(req, res){
    console.log("in restaurant login backend")
    await kafka.make_request('restaurantLogin', req.body, function(err,results){
        console.log('in result')
        console.log(results)
        if (err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.post('/api/restaurant/getAllRestaurants', async function(req, res){
    console.log("in user getAllRestaurants backend")
    await kafka.make_request('getAllRestaurants', req.body, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.post('/api/restaurant/getSelectedRestaurantData', async function(req, res){
    console.log("in user getSelectedRestaurantData backend")
    await kafka.make_request('getSelectedRestaurantData', req.body, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.get('/api/authUser/getAuthenticatedUserData', mongoAuth, async function(req, res){
    console.log("in user getAuthenticatedUserData backend" + req.userid)
    await kafka.make_request('getAuthenticatedUserData',req.userid, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.post('/api/authUser/editProfile', mongoAuth, async function(req, res){
    let userDetails = {
        userid : req.userid,
        ...req.body
    }
    console.log("in user editProfile backend" + userDetails)
    await kafka.make_request('editProfile', userDetails, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.post('/api/authUser/addToFavorite', mongoAuth, async function(req, res){
    let favDetails = {
        userid : req.userid,
        restaurantid : req.body.restaurantid,
        fav : 1
    }

    console.log("in user addToFavorite backend" + favDetails)
    await kafka.make_request('addToFavorite',favDetails, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.post('/api/authUser/addToUnfavorite', mongoAuth, async function(req, res){
    let unfavDetails = {
        userid : req.userid,
        restaurantid : req.body.restaurantid,
    }

    console.log("in user addToUnfavorite backend" + unfavDetails)
    await kafka.make_request('addToUnfavorite', unfavDetails, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.post('/api/authUser/createOrder', mongoAuth, async function(req, res){
    let orderDetails = {
        userid : req.userid,
        firstname : req.firstname,
        lastname : req.lastname,
        ...req.body
    }

    console.log("in user createOrder backend" + orderDetails)
    await kafka.make_request('createOrder', orderDetails, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.post('/api/authUser/cancelOrder', mongoAuth, async function(req, res){
    console.log("in user cancelOrder backend" + req.body.orderid)
    await kafka.make_request('cancelOrder', req.body.orderid, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.get('/api/authUser/getOrders', mongoAuth, async function(req, res){
    console.log("in user getOrders backend" + req.userid)
    await kafka.make_request('getOrders', req.userid, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.get('/api/authRestaurant/getAuthenticatedRestaurantData', mongoRestAuth, async function(req, res){
    console.log("in getAuthenticatedRestaurantData backend" + req.restaurantid)
    await kafka.make_request('getAuthenticatedRestaurantData',req.restaurantid, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.post('/api/authRestaurant/editRestaurantProfile', mongoRestAuth, async function(req, res){
    let restaurant = {
        restaurantid : req.restaurantid,
        ...req.body
    }

    console.log("in editRestaurantProfile backend" + restaurant)
    await kafka.make_request('editRestaurantProfile',restaurant, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.post('/api/authRestaurant/addDish', mongoRestAuth, async function(req, res){
    let newDish = {
        restaurantid : req.restaurantid,
        ...req.body
    }
    console.log("in addDish backend" + newDish)
    await kafka.make_request('addDish', newDish, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.post('/api/authRestaurant/editDish', mongoRestAuth, async function(req, res){
    let newDish = {
        restaurantid : req.restaurantid,
        ...req.body
    }
    console.log("in editDish backend" + req.body)
    await kafka.make_request('editDish', req.body, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.get('/api/authRestaurant/getOrderSummary', mongoRestAuth, async function(req, res){
    console.log("in getOrderSummary backend " + req.restaurantid )
    await kafka.make_request('getOrderSummary', req.restaurantid, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

app.post('/api/authRestaurant/changeOrderStatus', mongoRestAuth, async function(req, res){
    console.log("in changeOrderStatus backend " + JSON.stringify(req.body) )
    await kafka.make_request('changeOrderStatus', req.body, function(err,results){
        console.log('in result')
        console.log(results)
        if(err){
            console.log("Inside err")
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else{
            console.log("Inside else")
            res.json(results)
            res.end()
        }
    })
})

//start your server on port 3001
app.listen(3001)
console.log("Server Listening on port 3001")