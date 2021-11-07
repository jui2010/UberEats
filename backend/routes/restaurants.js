const router = require('express').Router()
const jwt = require('jsonwebtoken')
let Restaurant = require('../models/restaurantModel')

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

module.exports = router