var mysql = require('mysql')
var config = require('../config.json')

var con = mysql.createPool({                                                                                                                                                                                                                                    
    host: config.DB.host,
    user: config.DB.username,
    password: config.DB.password,
    port: config.DB.port,
    database: config.DB.database
})

//Signup a new restaurant
exports.signupRestaurant = (req, res) => {
    let restaurantName = req.body.restaurantName.trim()
    let location = req.body.location.trim()
    let email = req.body.email.trim()
    let password = req.body.password

    console.log(JSON.stringify("signupRestaurant function: "+restaurantName+" "+location+" "+email+" "+password))

    con.query(`insert into restaurants(restaurantName, location, email, password)
    values (?,?,?,?)`, [restaurantName, location , email, password],(error, results) => {
        if(error)
            console.log(error)
        else 
            res.end(JSON.stringify(results))
    })
}

// Login an existing restaurant
exports.loginRestaurant = (req, res) => {
    let email = req.body.email
    let password = req.body.password

    console.log(JSON.stringify("loginRestaurant function: "+email+" "+password))

    con.query(`select * from restaurants where email = ? and password = ?`, [email, password],(error, results) => {
        if(results.length > 0){
            res.cookie('cookieRestaurant', email, {maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = results
            res.end(JSON.stringify(results))
        }
        else
            res.end({error : "Incorrect username or password"})
    })
}

// Get all restaurants
exports.getAllRestaurants = (req, res) => {
    console.log(JSON.stringify("getAllRestaurants function: "))

    con.query(`select * from restaurants `,(error, results) => {
        if(results.length > 0){
            res.end(JSON.stringify(results))
        }
        else
            res.end({error : "Unauthenticated"})
    })
}