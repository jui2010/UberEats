const router = require('express').Router()
const jwt = require('jsonwebtoken')
let User = require('../models/userModel')
let Restaurant = require('../models/restaurantModel')
let Order = require('../models/orderModel')
let Favorite = require('../models/favoriteModel')
let Dish = require('../models/dishModel')

//signup a restaurant
router.route('/restaurantSignup').post((req, res) => {
    const restaurantName = req.body.restaurantName
    const location = req.body.location
    const email = req.body.email
    const password = req.body.password

    console.log(JSON.stringify("signupRestaurant function: "+restaurantName+" "+location+" "+email+" "+password))

    Restaurant.findOne({email : email})
        .then(restaurant => {
            if(restaurant){
                return res.status(500).send({ signupRestError : "This email ID is already in use"})
            }

            const newRestaurant = new Restaurant({restaurantName, location, email, password})

            newRestaurant.save()
                .then(() => res.json(newRestaurant))
                .catch(err => res.status(400).json({ error : err}))
        })
        .catch(err => res.status(500).send(err))
})

//login a restaurant
router.route('/restaurantLogin').post((req, res) => {
    const password = req.body.password
    const email = req.body.email

    console.log(JSON.stringify("loginRestaurant function: "+" "+email+" "+password))

    Restaurant.findOne({email : email})
        .then(restaurant => {
            if(restaurant.password === password){
                const token = jwt.sign({_id : restaurant._id }, process.env.TOKEN_SECRET)
                res.header('Authorization', token).send(token)
                console.log("Login successful")
            }
            else{
                return res.send({ loginRestError : "Incorrect email or password"})
            }
        })
        .catch(err => res.status(500).send(err))
})


//get selected restaurant data
router.route('/getSelectedRestaurantData').post((req, res) => {
    console.log(JSON.stringify("getSelectedRestaurantData function"))
    let userid = req.body.userid

    Restaurant.findOne({restaurantName : req.body.restaurantName})
        .then((restaurant) => {
            // console.log(JSON.stringify(restaurant))
            // console.log(JSON.stringify(userid))
            let restaurantid = restaurant._id
            // console.log(JSON.stringify( restaurant))

            Dish.find({restaurantid : restaurantid})
                .then((dishesArray) => {
                    restaurant = {
                        ...restaurant._doc,
                        dishes : dishesArray
                    }
                    // res.json(restaurant) 
                })
                .catch(err => res.status(400).json({ error : err}) )
            console.log(JSON.stringify(restaurantid))
            console.log(JSON.stringify(userid))
            Favorite.find({restaurantid : restaurant._id, userid : userid })
                .then((favoriteArray) => {
                    if(favoriteArray.length > 0){
                        restaurant = {
                            ...restaurant,
                            fav : 1
                        }
                    }
                    res.json(restaurant) 
                })
                .catch(err => res.status(400).json({ error : err}) )
    })
    .catch(err => res.status(400).json({ error : err}))
})

//get all restaurants
router.route('/getAllRestaurants').post((req, res) => {
    let userid = req.body.userid
    console.log(JSON.stringify("getAllRestaurants function"+userid))
    Restaurant.find()
        .then((restaurantArray) => {
            if(userid){
                restaurantArray.forEach(restaurant => {
                    Favorite.findOne({restaurantid : restaurant._id, userid : userid })
                        .then((favorite) => {
                            if(favorite){
                                restaurant.fav = 1
                            }
                        })
                        .catch(err => console.log(err))
                })
            }
            res.json(restaurantArray) 
        })
        .catch(err => res.status(400).json({ error : err}))
})

module.exports = router