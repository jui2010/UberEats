const jwt = require('jsonwebtoken')
let Restaurant = require('../models/restaurantModel')

module.exports = (req, res, next ) => {
    let idToken = ''

    if(req.headers.authorization){
        idToken = req.header("Authorization")
    } else{
        return res.status(403).json({error : "Un-Authorized"})
    }

    const decodedToken = jwt.verify(idToken, process.env.TOKEN_SECRET)

    Restaurant.findById(decodedToken._id)
        .then(restaurant => {
            // console.log("mongoRestAuth function"+JSON.stringify(restaurant))

            req.email = restaurant.email
            req.restaurantid = restaurant._id
            req.firstname = restaurant.firstname
            req.lastname = restaurant.lastname
            return next()
        })
        .catch(err => {
            return res.status(400).json(err.code)
        })
}