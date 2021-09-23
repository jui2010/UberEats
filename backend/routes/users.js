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
exports.signupUser = (req, res) => {
    let firstname = req.body.firstname.trim()
    let lastname = req.body.lastname.trim()
    let email = req.body.email.trim()
    let password = req.body.password

    console.log(JSON.stringify("signupUser function: "+firstname+" "+lastname+" "+email+" "+password))

    con.query(`insert into users(firstname, lastname, email, password)
    values (?,?,?,?)`, [firstname, lastname , email, password],(error, results) => {
        if(error)
            console.log(error)
        else{ 
            res.end(JSON.stringify(results))
        }
    })
}

// Login an existing user
exports.loginUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password

    console.log(JSON.stringify("loginUser function: "+email+" "+password))

    con.query(`select * from users where email = ? and password = ?`, [email, password],(error, results) => {
        if(results.length > 0){
            res.end(JSON.stringify(results))
        }
        else
            res.end({error : "Incorrect username or password"})
    })
}

// Edit profile for an existing user
exports.editProfile = (req, res) => {
    let email = req.body.email
    let phone  = req.body.phone
    let nickname = req.body.nickname
    let dob = req.body.dob
    let about = req.body.about
    let city = req.body.city
    let state = req.body.state
    let country = req.body.country

    console.log(JSON.stringify("editProfile function: "+email))
    console.log(JSON.stringify("editProfile function: "+phone+" "+nickname+" "+dob+" "+about+" "+city+" "+state+" "+country))

    con.query(`update users set phone = ?, nickname = ?, dob = ?, about = ?, city = ?, state = ?, country = ?  WHERE email = ? `, 
        [phone, nickname, dob, about, city, state, country, email],(error, results) => {
            console.log("Record Updated!!");
            console.log(results);
        })
}