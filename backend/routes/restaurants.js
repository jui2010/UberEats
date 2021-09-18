var mysql = require('mysql')
var config = require('../config.json')

var con = mysql.createPool({                                                                                                                                                                                                                                    
    host: config.DB.host,
    user: config.DB.username,
    password: config.DB.password,
    port: config.DB.port,
    database: config.DB.database
})

//Signup a new user
exports.signupRestaurant = (req, res) => {
    let restaurantName = req.body.restaurantName.trim()
    let location = req.body.location.trim()
    let email = req.body.email.trim()
    let password = req.body.password

    console.log(JSON.stringify("signupUser function: "+restaurantName+" "+location+" "+email+" "+password))

    con.query(`insert into restaurants(restaurantName, location, email, password)
    values (?,?,?,?)`, [restaurantName, location , email, password],(error, results) => {
        if(error)
            console.log(error)
        else 
            res.end(JSON.stringify(results))
    })
}

// Login an existing user
exports.loginRestaurant = (req, res) => {
    let email = req.body.email.trim()
    let password = req.body.password

    console.log(JSON.stringify("loginUser function: "+email+" "+password))

    con.query(`select count(*) from restaurants where email = ? and password = ?`, [email, password],(error, results) => {
        if(error)
            console.log(error)
        else 
            res.end(JSON.stringify(results))
    })
}