const router = require('express').Router()
const jwt = require('jsonwebtoken')
let User = require('../models/userModel')
let Restaurant = require('../models/restaurantModel')
let Order = require('../models/orderModel')
let Favorite = require('../models/favoriteModel')
let Dish = require('../models/dishModel')
// var kafka = require('../kafka/client')

// signup a user
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

// router.route('/signup').post((req, res) => {

//     kafka.make_request('signup_topic', req.body, function(err,results){
//         console.log('in signup')
//         console.log(err)
//         console.log(results)
//         if(err){
//             console.log("Inside err")
//             res.json(err)
//         }
//         else{
//             console.log("Inside result");
//             res.json(results)
//             res.end()
//         }
//     })
// })

// const express = require("express");

// //Passport authentication
// var passport = require('passport');
// var requireAuth = passport.authenticate('jwt', { session: false });

// router.post("/signup", (req, res) => {
//   console.log("Inside customer signup Post Request");
//   console.log("Req Body : ", req.body);

//   kafka.make_request("signup_topic", req.body, function (err, results) {
//     console.log("In make request call back");
//     console.log(results);
//     console.log(err);
//     if (err) {
//       console.log("Inside err");
//       console.log(err);
//       return res.status(err.status).send(err.message);
//     } else {
//       console.log("Inside else");
//       console.log(results);
//       return res.status(results.status).send(results.message);
//     }
//   });
// });


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

module.exports = router