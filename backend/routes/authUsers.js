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

module.exports = router