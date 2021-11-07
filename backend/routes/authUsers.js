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

module.exports = router
