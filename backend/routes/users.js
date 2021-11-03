var mysql = require('mysql')
const bcrypt = require('bcrypt-nodejs')
var passwordHash = require('password-hash')
const con = require('../config/config')

//Signup a new user
exports.signupUser = (req, res) => {
    let firstname = req.body.firstname.trim()
    let lastname = req.body.lastname.trim()
    let email = req.body.email.trim()
    // const salt = bcrypt.genSalt(10)
    let password = req.body.password

    console.log(JSON.stringify("signupUser function: "+firstname+" "+lastname+" "+email+" "+password))

    con.query(`select * from users where email = ?`, [email],(error, results) => {
        if(error){
            res.status(500).json(error)
            console.log(error)
        }
        else{ 
            if(results.length > 0){
                res.end({error : "This email id already exists."})
            } else {
                con.query(`insert into users(firstname, lastname, email, password)
                values (?,?,?,?)`, [firstname, lastname , email, password], (error, results) => {
                    if(error){
                        res.writeHead(400, {
                            'Content-type': 'text/plain'
                        })
                        console.log(error)
                        res.end(error + "")
                    }    
                    else{ 
                        res.end(JSON.stringify(results))
                    }
                })
            }
        }
    })
}

// Login an existing user
exports.loginUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password

    con.query(`select * from users where email = ? `, [email],(error, results) => {
        let hp = passwordHash.generate(results[0].password)
        
        console.log(JSON.stringify("loginUser function: "+email+" "+password+" "+ results[0].password+" "))
        if(error){
            res.status(401).send({error : 'Unauthorized'})
        } else {
            if(results.length == 0){
                res.send({loginError : "Username not found"})
            }
            else if(password != results[0].password){
                res.send({loginError : "Incorrect username or password"})
            }
            else if(results.length > 0 ){
                res.cookie('cookie', email, {maxAge: 900000, httpOnly: false, path : '/'});
                req.session.user = results
                res.end(JSON.stringify(results))
            }
        }
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
            console.log("Record Updated!!")
            console.log(results)
            res.end(JSON.stringify(results))
        })
}

// get authenticated user
exports.authenticatedUser = (req, res) => {
    let email = req.body.email

    console.log(JSON.stringify("authenticatedUser function: "+email))
    con.query(`select * from users where email = ? `, [email],(error, results) => {
        if(results.length > 0){
            res.end(JSON.stringify(results))
        }
        else
            res.end({error : "Incorrect username or password"})
    })
}

// get selected user
exports.getSelectedUser = (req, res) => {
    console.log(JSON.stringify("getSelectedUser function: "+ req.params.userid))

    let userid = req.params.userid

    con.query(`select * from users where userid = ? `, [userid],(error, results) => {
        if(results.length > 0){
            res.end(JSON.stringify(results))
        }
        else
            res.end({error : "Incorrect username or password"})
    })
}

// Get all orders for a particular user
exports.getOrders = (req, res) => {
    let userid = req.body.userid

    console.log(JSON.stringify("getOrders function: "+userid))

    con.query(`
    select a.*, b.restaurantName, b.location, c.dishName from
(select * from orders where userid = ?) a
left join 
(select restaurantid , restaurantName, location from restaurants) b
on a.restaurantid = b.restaurantid
left join
(select dishid , dishName from dishes) c
on a.dishid = c.dishid `, [userid],(error, results) => {
            console.log("Orders fetched!!")
            console.log(results)
            res.end(JSON.stringify(results))
        })
}

//Add a favorite restaurant
exports.addToFavorite = (req, res) => {
    let userid = req.body.userid
    let restaurantid = req.body.restaurantid
    let fav = 1

    console.log(JSON.stringify("addToFavorite function: "+restaurantid))

    con.query(`insert into favorites (userid, restaurantid, fav)
    values (?,?,?)`, [userid, restaurantid, fav ],(error, results) => {
        if(error)
            console.log(error)
        else 
            res.end(JSON.stringify(results))
    })
}

//Delete a favorite restaurant
exports.addToUnfavorite = (req, res) => {
    let userid = req.body.userid
    let restaurantid = req.body.restaurantid

    console.log(JSON.stringify("addToFavorite function: "+restaurantid))

    con.query(`delete from favorites where userid= ? and restaurantid = ?`, [userid, restaurantid],(error, results) => {
        if(error)
            console.log(error)
        else 
            res.end(JSON.stringify(results))
    })
}