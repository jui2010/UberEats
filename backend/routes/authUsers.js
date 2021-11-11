const router = require('express').Router()
const jwt = require('jsonwebtoken')
let User = require('../models/userModel')
let Restaurant = require('../models/restaurantModel')
let Order = require('../models/orderModel')
let Favorite = require('../models/favoriteModel')
let Dish = require('../models/dishModel')

//get authenticated user data
router.route('/getAuthenticatedUserData').get((req, res) => {
    console.log(JSON.stringify("getAuthenticatedUserData function"))
    console.log("userid :"+JSON.stringify(req.userid))

    User.findById(req.userid)
        .then((user) => {
            res.json(user) 
        })
        .catch(err => res.status(400).json({ error : err}))
})

//edit user profile
router.route('/editProfile').post((req, res) => {
    console.log(JSON.stringify("editProfile function"))
    User.findById(req.userid)
        .then((user) => {
            user.email = req.body.email
            user.phone  = req.body.phone
            user.nickname = req.body.nickname
            user.dob = req.body.dob
            user.about = req.body.about
            user.city = req.body.city
            user.state = req.body.state
            user.country = req.body.country

            user.save()
                .then(() => res.json(user) )
                .catch(err => res.status(400).json({ error : err}))
        })
})

//add restaurant to favorite
router.route('/addToFavorite').post((req, res) => {
    console.log(JSON.stringify("addToFavorite function"))
    // console.log("userid :"+JSON.stringify(req.userid))
    let userid = req.userid
    let restaurantid = req.body.restaurantid
    let fav = 1

    const newFavorite = new Favorite({userid, restaurantid, fav})
    newFavorite.save()
        .then(() => res.json(newFavorite))
        .catch(err => res.status(400).json({ error : err}))

})

//add restaurant to favorite
router.route('/addToUnfavorite').post((req, res) => {
    console.log(JSON.stringify("addToUnfavorite function"))

    let userid = req.userid
    let restaurantid = req.body.restaurantid
    console.log("userid :"+JSON.stringify(userid))
    console.log("restaurantid :"+JSON.stringify(restaurantid))
    Favorite.deleteMany({userid : userid, restaurantid : restaurantid})
        .then(() => res.json("Question and Answer deleted"))
        .catch(err => res.status(400).json({ error : err}))
})

//create order
router.route('/createOrder').post((req, res) => {
    console.log(JSON.stringify("createOrder function"))

    let userid = req.userid
    let firstname = req.firstname
    let lastname = req.lastname
    let restaurantid = req.body.restaurantid
    let restaurantName = req.body.restaurantName
    let location = req.body.location
    let deliveryOrPickup = req.body.deliveryOrPickup
    let orderStatus = req.body.orderStatus
    let dishes = req.body.dishes
    let instructions = req.body.instructions

    console.log("userid :"+JSON.stringify(userid))
    console.log("restaurantid :"+JSON.stringify(restaurantid))
    const newOrder = new Order({userid, firstname, lastname,restaurantid, restaurantName, location, deliveryOrPickup, orderStatus, dishes , instructions})
    newOrder.save()
        .then(() => res.json(newOrder))
        .catch(err => res.status(400).json({ error : err}))
})


//cancel order
router.route('/cancelOrder').post((req, res) => {
    console.log(JSON.stringify("cancelOrder function"))
    Order.findById(req.body.orderid)
        .then((order) => {
            order.orderStatus = "cancelled"

            order.save()
                .then(() => res.json(order) )
                .catch(err => res.status(400).json({ error : err}))
        })
})

//get orders
router.route('/getOrders').get((req, res) => {
    console.log(JSON.stringify("getOrders function"))
    console.log("userid :"+JSON.stringify(req.userid))
    Order.find({userid : req.userid})
        .then((orderArray) => {
            console.log("orders :"+JSON.stringify(orderArray))
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
                    .catch(err => console.log(err))
            })
            res.json(orderArray) 
            console.log("orders :"+JSON.stringify(orderArray))
        })
        .catch(err => res.status(400).json({ error : err}))
})

module.exports = router