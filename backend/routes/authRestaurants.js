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

module.exports = router