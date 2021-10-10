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

// get authenticated restaurant
exports.getAuthenticatedRestaurant = (req, res) => {
    let email = req.body.email

    console.log(JSON.stringify("getAuthenticatedRestaurant function: "+email))
    con.query(`select * from restaurants where email = ? `, [email],(error, results) => {
        if(results.length > 0){
            res.end(JSON.stringify(results))
        }
        else
            res.end({error : "Incorrect username or password"})
    })
}

// Get all restaurants
exports.getAllRestaurants = (req, res) => {
    let userid = req.body.userid

    console.log(JSON.stringify("getAllRestaurants function: " + userid))

    con.query(`select a.*, b.fav from
    (select * from restaurants) a 
    left join
    (select * from favorites where userid = ?)b
    on a.restaurantid = b.restaurantid `,[userid], (error, results) => {
        if(results.length > 0){
            res.end(JSON.stringify(results))
    // console.log(JSON.stringify(results))
        }
        else
            res.end({error : "Unauthenticated"})
    })
}

// Get all restaurants
exports.getRestaurantData = (req, res) => {
    console.log(JSON.stringify("getRestaurantData function: "+ req.params.restaurantName))

    con.query(`select * from restaurants where restaurantName = ? `, [req.params.restaurantName],(error, results) => {
        
        let restaurantData= ''
        if(results.length > 0){
            restaurantData = results[0]

            restaurantid = restaurantData.restaurantid

            con.query(`select * from dishes where restaurantid = ? `, [restaurantid],(error, results) => {
                restaurantData.dishes = []
                restaurantData.dishes = results

                res.end(JSON.stringify(restaurantData))
            })
        }
        else
            res.end({error : "Unauthenticated"})
    })
}

// Edit profile for a logged in restaurant
exports.editRestaurantProfile = (req, res) => {
    let restaurantName = req.body.restaurantName
    let email = req.body.email
    let phone = req.body.phone
    let location = req.body.location
    let address = req.body.address
    let description = req.body.description
    let deliveryFee = req.body.deliveryFee
    let timing = req.body.timing
    let tile = req.body.tile

    console.log(JSON.stringify("editRestaurantProfile function: "+email))
    console.log(JSON.stringify("editRestaurantProfile function: "+restaurantName+" "+phone+" "+location+" "+address+" "+description+" "+deliveryFee+" "+timing+" " +tile))
    
    con.query(`SET SQL_SAFE_UPDATES = 0`,(error, results) => {
        res.end(JSON.stringify(results))
    })
    con.query(`update restaurants set restaurantName = ?, phone = ?, location = ?, address = ?, description = ?, deliveryFee = ?, timing = ?, tile = ?  WHERE email = ? `, 
        [restaurantName, phone, location, address, description, deliveryFee, timing, tile, email ],(error, results) => {
            console.log("Record Updated - restaurant!!")
            console.log(results)
            res.end(JSON.stringify(results))
        })
}

//Add a new dish for a particular restaurant
exports.addDish = (req, res) => {
    let restaurantid = req.body.restaurantid
    let dishName = req.body.dishName
    let dishPrice = req.body.dishPrice
    let dishDescription = req.body.dishDescription
    let dishCategory = req.body.dishCategory
    let dishPicture = req.body.dishPicture
    let dishType = req.body.dishType
    let cuisine = req.body.cuisine

    console.log(JSON.stringify("addDish function: "+dishName))

    con.query(`insert into dishes(restaurantid, dishName, dishPrice, dishDescription, dishCategory, dishPicture, cuisine, dishType)
    values (?,?,?,?,?,?,?,?)`, [restaurantid, dishName, dishPrice, dishDescription, dishCategory, dishPicture, cuisine, dishType],(error, results) => {
        if(error)
            console.log(error)
        else 
            res.end(JSON.stringify(results))
    })
}

// get the maximum orderid from orders table
exports.getMaxOrderId = (req, res) => {
    console.log(JSON.stringify("getMaxOrderId function: "))

    con.query(`select max(orderid) as maxOrderId from orders`,(error, results) => {
        if(results.length > 0){
            res.end(JSON.stringify(results))
        }
        else
            res.end({error : "Unauthenticated"})
    })
}

//Create a new order
exports.createOrder = (req, res) => {
    let orderid = req.body.orderid
    let userid = req.body.userid
    let dishid = req.body.dishid
    let restaurantid = req.body.restaurantid
    let dishQuantity = req.body.dishQuantity
    let dishPrice = req.body.dishPrice
    let deliveryOrPickup = req.body.deliveryOrPickup
    let orderStatus = req.body.orderStatus
    console.log(JSON.stringify("createOrder function: "+orderid))

    con.query(`insert into orders(orderid, userid,dishid, restaurantid, dishQuantity, dishPrice, deliveryOrPickup, orderStatus, orderDate, orderTime)
    values (?,?,?,?,?,?,?,?, current_date(), current_time())`, [orderid, userid,dishid, restaurantid, dishQuantity, dishPrice, deliveryOrPickup, orderStatus],(error, results) => {
        if(error)
            console.log(error)
        else 
            res.end(JSON.stringify(results))
    })
}

// Get all orders for a particular restaurant
exports.getOrderSummary = (req, res) => {
    let restaurantid = req.body.restaurantid

    console.log(JSON.stringify("getOrderSummary function: "+restaurantid))

    con.query(`
    select a.*, b.restaurantName, b.location, c.dishName, d.firstname, d.lastname from
    (select * from orders where restaurantid = ?) a
    left join 
    (select restaurantid , restaurantName, location from restaurants) b
    on a.restaurantid = b.restaurantid
    left join
    (select dishid , dishName from dishes) c
    on a.dishid = c.dishid
    left join
    (select userid , firstname, lastname from users) d
    on a.userid = d.userid; `, [restaurantid],(error, results) => {
            console.log("Orders fetched!!")
            console.log(results)
            res.end(JSON.stringify(results))
        })
}

// Change order status
exports.changeOrderStatus = (req, res) => {
    let orderid = req.body.orderid
    let orderStatus = req.body.orderStatus

    console.log(JSON.stringify("changeOrderStatus function: "+orderStatus))

    con.query(`update orders set orderStatus = ? WHERE orderid = ? `, 
        [orderStatus, orderid],(error, results) => {
            console.log("Order Status Changed!!")
            console.log(results)
            res.end(JSON.stringify(results))
        })
}