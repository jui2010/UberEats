const router = require('express').Router()
const jwt = require('jsonwebtoken')
let User = require('../models/userModel')
let Restaurant = require('../models/restaurantModel')
let Order = require('../models/orderModel')
let Favorite = require('../models/favoriteModel')
let Dish = require('../models/dishModel')

//signup a user
router.route('/signup').post((req, res) => {
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email

    console.log(JSON.stringify("signupUser function: "+firstname+" "+lastname+" "+email+" "+password))

    User.findOne({email : email})
        .then(user => {
            if(user){
                return res.status(500).send({ signupError : "This email ID is already in use"})
            }

            const newUser = new User({firstname, lastname, email, password})

            newUser.save()
                .then(() => res.json(newUser))
                .catch(err => res.status(400).json({ error : err}))
        })
        .catch(err => res.status(500).send(err))
})

//login a user
router.route('/login').post((req, res) => {
    const password = req.body.password
    const email = req.body.email

    console.log(JSON.stringify("loginUser function: "+" "+email+" "+password))

    User.findOne({email : email})
        .then(user => {
            if(user.password === password){
                const token = jwt.sign({_id : user._id }, process.env.TOKEN_SECRET)
                res.header('authorization', token).send(token)
            }
            else{
                return res.send({ loginError : "Incorrect email or password"})
            }
        })
        .catch(err => res.status(500).send(err))
})

//login a user
router.route('/getAuthenticatedUserData').get((req, res) => {
    console.log(JSON.stringify("getAuthenticatedUserData function"))
    console.log(JSON.stringify(req.params))

    User.findById(req.userId)
        .then((user) => {
            res.json(user) 
        })
        .catch(err => res.status(400).json({ error : err}))
})

module.exports = router
