const router = require('express').Router()
const jwt = require('jsonwebtoken')
let User = require('../models/userModel')
let Restaurant = require('../models/restaurantModel')
let Order = require('../models/orderModel')
let Favorite = require('../models/favoriteModel')
let Dish = require('../models/dishModel')

//get authenticated restaurant data
router.route('/getAuthenticatedRestaurantData').get((req, res) => {
    console.log(JSON.stringify("getAuthenticatedRestaurantData function"))
    console.log("restaurantid :"+JSON.stringify(req.restaurantid))

    Restaurant.findById(req.restaurantid)
        .then((restaurant) => {
            res.json(restaurant) 
        })
        .catch(err => res.status(400).json({ error : err}))
})

// edit restaurant details
router.route('/editRestaurantProfile').post((req, res) => {
    Restaurant.findById(req.restaurantid)
        .then((restaurant) => {
            restaurant.restaurantName = req.body.restaurantName
            restaurant.email = req.email
            restaurant.phone = req.body.phone
            restaurant.location = req.body.location
            restaurant.address = req.body.address
            restaurant.description = req.body.description
            restaurant.deliveryFee = req.body.deliveryFee
            restaurant.timing = req.body.timing
            restaurant.tile = req.body.tile
            restaurant.typeOfRestaurant = req.body.typeOfRestaurant
            restaurant.typeOfFood = req.body.typeOfFood
            
            restaurant.save()
                .then(() => res.json(restaurant) )
                .catch(err => res.status(400).json({ error : err}))
        })
        .catch(err => res.status(400).json({ error : err}))
})

// edit restaurant details
router.route('/addDish').post((req, res) => {
    let dishDetails = {
        restaurantid : req.restaurantid,
        dishName : req.body.dishName,
        dishPrice : req.body.dishPrice,
        dishDescription : req.body.dishDescription,
        dishCategory : req.body.dishCategory,
        dishPicture : req.body.dishPicture,
        dishType : req.body.dishType,
        cuisine : req.body.cuisine
    }
    const newDish = new Dish(dishDetails)

    newDish.save()
        .then(() => res.json(newDish))
        .catch(err => res.status(400).json({ error : err}))
})

// edit dish details
router.route('/editDish').post((req, res) => {

    Dish.findById(req.body.dishid)
        .then((dish) => {
            dish.dishid = req.body.dishid
            dish.dishName = req.body.dishName
            dish.dishPicture = req.body.dishPicture
            dish.dishDescription = req.body.dishDescription
            dish.dishCategory = req.body.dishCategory
            dish.cuisine = req.body.cuisine
            dish.dishType = req.body.dishType
            dish.dishPrice = req.body.dishPrice
            dish.save()
                .then(() => res.json(dish) )
                .catch(err => res.status(400).json({ error : err}))
        })
        .catch(err => res.status(400).json({ error : err}))
})

// Get all orders for a particular restaurant
router.route('/getOrderSummary').get((req, res) => {
    console.log(JSON.stringify("getOrderSummary function" +req.restaurantid))

    Order.find({restaurantid : req.restaurantid})
        .then((orderArray) => {
            console.log("order"+JSON.stringify(orderArray))
            res.json(orderArray)      
        })
        .catch(err => res.status(400).json({ error : err}))
})

// change order status
router.route('/changeOrderStatus').post((req, res) => {
    console.log(JSON.stringify("changeOrderStatus function" +req.body.orderid))

    Order.findById(req.body.orderid)
        .then((order) => {
            order.orderStatus = req.body.orderStatus
            order.save()
                .then(() => res.json(order) )
                .catch(err => res.status(400).json({ error : err}))
        })
        .catch(err => res.status(400).json({ error : err}))
})

module.exports = router