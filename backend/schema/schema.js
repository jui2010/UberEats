const graphql = require('graphql')
const {GraphQLObjectType, GraphQLSchema,GraphQLList, GraphQLInt, GraphQLString} = graphql
const UserType = require('./TypeDefs/UserType')
const RestaurantType = require('./TypeDefs/RestaurantType')
const DishType = require('./TypeDefs/DishType')
const DishInputType = require('./TypeDefs/DishInputType')
const OrderType = require('./TypeDefs/OrderType')
let User = require('../models/userModel')
let Restaurant = require('../models/restaurantModel')
let Dish = require('../models/dishModel')
let Order = require('../models/orderModel')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

const RootQuery = new GraphQLObjectType({
    name : "RootQueryType",
    fields : {
        getAllRestaurants : {
            type : new GraphQLList(RestaurantType),
            args : {},
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    Restaurant.find((err, restaurant) => {
                        if (err) {
                            console.log('result in error', restaurant)
                            reject("error")
                        }
                        else {
                            console.log('getAllRestaurants', restaurant)
                            resolve(restaurant)
                        }
                    })
                })
            }
        },

    }
  })
  
  const Mutation = new GraphQLObjectType({
    name : "Mutation",
    fields : {
        signupUser : {
            type : UserType,
            args : {
                firstname : { type : GraphQLString},
                lastname : { type : GraphQLString},
                email : { type : GraphQLString},
                password : { type : GraphQLString}
            },
            resolve(parent, args){
                const salt = bcrypt.genSalt(10)
                const hashedPassword = bcrypt.hash(args.password, salt)

                return new Promise((resolve, reject) => {
                    const newUser = new User({
                        firstname : args.firstname, 
                        lastname : args.lastname, 
                        email : args.email, 
                        password : hashedPassword
                    })
                    console.log("In signupUser :" +JSON.stringify(newUser))
                    newUser.save((err, user) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Email already exists"})
                        }
                        else {
                            console.log('result', {
                                firstname : args.firstname, 
                                lastname : args.lastname, 
                                email : args.email,
                                password : hashedPassword
                            })
                            resolve({
                                firstname : args.firstname, 
                                lastname : args.lastname, 
                                email : args.email
                            })
                            console.log("signupUser successful")
                        } 
                    })
                })
            }
        },

        loginUser : {
            type : UserType,
            args : {
                email : { type : GraphQLString},
                password : { type : GraphQLString}
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    console.log("In loginUser :" +JSON.stringify(args))

                    User.findOne({email : args.email}, (err, user) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Invalid username"})
                        }
                        else {
                            if( bcrypt.compare(args.password, user.password)){
                                const token = jwt.sign({_id : userItem._id }, "dhvbhcvbhd")
                                console.log("user token : "+token)
                                resolve({ token : token })
                                console.log("loginUser successful")
                            }
                            else {
                                reject({error : "Invalid password"})
                            }
                        } 
                    })
                })
            }
        },

        getAuthenticatedUserData : {
            type : UserType,
            args : {
                _id : { type : GraphQLString}
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    User.findById(args._id, (err, user) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Invalid username or password"})
                        }
                        else {
                            console.log('user', JSON.stringify(user))
                            resolve(user)
                        } 
                    })
                })
            }
        },

        signupRestaurant : {
            type : RestaurantType,
            args : {
                restaurantName : { type : GraphQLString},
                location : { type : GraphQLString},
                email : { type : GraphQLString},
                password : { type : GraphQLString}
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    const newRestaurant = new Restaurant({
                        restaurantName : args.restaurantName, 
                        location : args.location, 
                        email : args.email, 
                        password : args.password
                    })
                    newRestaurant.save((err, restaurant) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Email already exists"})
                        }
                        else {
                            const salt = bcrypt.genSalt(10)
                            let hashedPassword = bcrypt.hash(args.password, salt)

                            console.log('result', {
                                restaurantName : args.restaurantName, 
                                location : args.location, 
                                email : args.email, 
                                password : hashedPassword
                            })
                            resolve({
                                restaurantName : args.restaurantName, 
                                location : args.location, 
                                email : args.email
                            })
                        } 
                    })
                })
            }
        },

        loginRestaurant : {
            type : RestaurantType,
            args : {
                email : { type : GraphQLString},
                password : { type : GraphQLString}
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    Restaurant.findOne({email : args.email, password : args.password}, (err, restaurant) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Invalid restaurant email"})
                        }
                        else {
                            console.log(JSON.stringify(restaurant))

                            if( bcrypt.compare(args.password, restaurant.password)){
                                const token = jwt.sign({_id : restaurant._id }, "dhvbhcvbhd")
                                resolve({ token : token })
                            }
                            else {
                                reject({error : "Invalid password"})
                            }
                        } 
                    })
                })
            }
        },

        getSelectedRestaurantData : {
            type : RestaurantType,
            args : {
                restaurantName : { type : GraphQLString},
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    Restaurant.findOne({restaurantName : args.restaurantName}, (err, restaurant) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Invalid restaurant name"})
                        }
                        else {
                            restaurant && 
                            Dish.find({restaurantid : restaurant._id})
                                .then((dishesArray) => {
                                    restaurant = {
                                    ...restaurant._doc,
                                    dishes : dishesArray
                                    }
                                    console.log("GET RESTAURANT DATA "+JSON.stringify(restaurant))
                                    resolve({
                                        _id : restaurant._id,
                                        restaurantName : restaurant.restaurantName,
                                        email : restaurant.email,
                                        location : restaurant.location,
                                        address : restaurant.address,
                                        deliveryFee : restaurant.deliveryFee,
                                        description : restaurant.description,
                                        phone : restaurant.phone,
                                        timing : restaurant.timing,
                                        typeOfFood : restaurant.typeOfFood,
                                        typeOfRestaurant : restaurant.typeOfRestaurant,
                                        tile : restaurant.tile,
                                        dishes : [
                                            ...restaurant.dishes
                                        ]
                                    })
                                })
                                .catch(err => res.status(400).json({ error : err}) )
                        } 
                    })
                })
            }
        },

        createOrder : {
            type : OrderType,
            args : {
                userid : { type : GraphQLString},
                firstname : { type : GraphQLString},
                lastname : { type : GraphQLString},
                restaurantid : { type : GraphQLString},
                restaurantName : { type : GraphQLString},
                location : { type : GraphQLString},
                deliveryOrPickup : { type : GraphQLString},
                orderStatus : { type : GraphQLString},
                instructions : { type : GraphQLString},
                // dishes : { type :  new GraphQLList(DishInputType)}
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    console.log("AGRDFDGDGD" + JSON.stringify(args))
                    const newOrder = new Order(args)
                    newOrder.save((err, order) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Error"})
                        }
                        else {
                            resolve(order)
                        } 
                    })
                })
            }
        },

        getAuthenticatedRestaurantData : {
            type : RestaurantType,
            args : {
                restaurantid : { type : GraphQLString},
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    Restaurant.findOne({_id : args.restaurantid}, (err, restaurant) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Invalid restaurant name"})
                        }
                        else {
                            console.log(JSON.stringify(restaurant))
                            resolve(restaurant)
                        } 
                    })
                })
            }
        },

        addDish : {
            type : DishType,
            args : {
                restaurantid : { type : GraphQLString},
                dishName : { type : GraphQLString},
                dishPrice : { type : GraphQLString},
                dishDescription : { type : GraphQLString},
                dishCategory : { type : GraphQLString},
                dishPicture : { type : GraphQLString}, 
                dishType : { type : GraphQLString},
                cuisine : { type : GraphQLString}
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    const newDish = new Dish(args)
                    newDish.save((err, dish) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Error"})
                        }
                        else {
                            console.log("AddDish "+dish)
                            resolve(dish)
                        } 
                    })
                })
            }
        },

        editDish : {
            type : DishType,
            args : {
                dishid : { type : GraphQLString},
                dishName : { type : GraphQLString},
                dishPrice : { type : GraphQLString},
                dishDescription : { type : GraphQLString},
                dishCategory : { type : GraphQLString},
                dishPicture : { type : GraphQLString}, 
                dishType : { type : GraphQLString},
                cuisine : { type : GraphQLString}
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    Dish.findOne({_id : args.dishid}, (err, dish) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Invalid dish name"})
                        }
                        else {
                            if(dish){
                                dish.dishName = args.dishName
                                dish.dishPicture = args.dishPicture
                                dish.dishDescription = args.dishDescription
                                dish.dishCategory = args.dishCategory
                                dish.cuisine = args.cuisine
                                dish.dishType = args.dishType
                                dish.dishPrice = args.dishPrice
                        
                                dish.save()
                                  .then((dishData) => resolve(dishData) )
                                  .catch(err => reject({error : "Error"}))
                            }
                        } 
                    })
                })
            }
        },

        editProfile : {
            type : UserType,
            args : {
                userid: { type : GraphQLString},
                phone: { type : GraphQLString},
                nickname: { type : GraphQLString},
                dob: { type : GraphQLString},
                about: { type : GraphQLString},
                city: { type : GraphQLString},
                state: { type : GraphQLString},
                country: { type : GraphQLString},
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    console.log("In editProfile :" +JSON.stringify(args))
                    User.findOne({_id : args.userid}, (err, user) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Invalid user name"})
                        }
                        else {
                            if(user){
                                user.phone  = args.phone
                                user.nickname = args.nickname
                                user.dob = args.dob
                                user.about = args.about
                                user.city = args.city
                                user.state = args.state
                                user.country = args.country
                        
                                user.save()
                                  .then((userData) => resolve(userData) )
                                  .catch(err => reject({error : "Error"+err}))
                                console.log("editProfile successful")
                            }
                        } 
                    })
                })
            }
        },

        editRestaurantProfile : {
            type : RestaurantType,
            args : {
                restaurantid : { type : GraphQLString},
                restaurantName: { type : GraphQLString},
                phone: { type : GraphQLString},
                location: { type : GraphQLString},
                address: { type : GraphQLString},
                description: { type : GraphQLString},
                deliveryFee: { type : GraphQLString},
                timing: { type : GraphQLString},
                tile: { type : GraphQLString},
                typeOfRestaurant: { type : GraphQLString},
                typeOfFood: { type : GraphQLString}
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    Restaurant.findOne({_id : args.restaurantid}, (err, restaurant) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Invalid restaurant name"})
                        }
                        else {
                            if(restaurant){
                                restaurant.phone = args.phone
                                restaurant.location = args.location
                                restaurant.address = args.address
                                restaurant.description = args.description
                                restaurant.deliveryFee = args.deliveryFee
                                restaurant.timing = args.timing
                                restaurant.tile = args.tile
                                restaurant.typeOfRestaurant = args.typeOfRestaurant
                                restaurant.typeOfFood = args.typeOfFood
                        
                                restaurant.save()
                                  .then((restaurantData) => resolve(restaurantData) )
                                  .catch(err => reject({error : "Error"+ err}))
                            }
                        } 
                    })
                })
            }
        },

        getOrders : {
            type : new GraphQLList(OrderType),
            args : {
                userid : { type : GraphQLString},
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    Order.find({userid : args.userid}, (err, orderArray) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Invalid order"})
                        }
                        else {
                            if(orderArray){
                                resolve(orderArray)
                            }
                        } 
                    })
                })
            }
        },

        getOrderSummary : {
            type : new GraphQLList(OrderType),
            args : {
                restaurantid : { type : GraphQLString},
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    Order.find({restaurantid : args.restaurantid}, (err, orderArray) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Invalid order"})
                        }
                        else {
                            if(orderArray){
                                resolve(orderArray)
                            }
                        } 
                    })
                })
            }
        },

        changeOrderStatus : {
            type : OrderType,
            args : {
                orderid : { type : GraphQLString},
                orderStatus : { type : GraphQLString},
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    Order.findOne({_id : args.orderid}, (err, order) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Invalid order"})
                        }
                        else {
                            if(order){
                                order.orderStatus = args.orderStatus
                                order.save()
                                .then((order) => resolve(order) )
                                .catch(err => reject({error : "Error"+ err}) )
                            }
                        } 
                    })
                })
            }
        },

    }
})
  
module.exports = new GraphQLSchema({query : RootQuery, mutation : Mutation})
  