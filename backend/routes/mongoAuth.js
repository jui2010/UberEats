const jwt = require('jsonwebtoken')
let User = require('../models/userModel')

module.exports = (req, res, next ) => {
    let idToken = ''

    if(req.headers.authorization){
        idToken = req.header("Authorization")
    } else{
        return res.status(403).json({error : "Un-Authorized"})
    }

    const decodedToken = jwt.verify(idToken, process.env.TOKEN_SECRET)

    User.findById(decodedToken._id)
        .then(user => {
            console.log("mongoAuth function"+JSON.stringify(user))

            req.email = user.email
            req.userid = user._id
            req.firstname = user.firstname
            req.lastname = user.lastname
            return next()
        })
        .catch(err => {
            return res.status(400).json(err.code)
        })
}