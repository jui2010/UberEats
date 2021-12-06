const graphql = require('graphql')
const {GraphQLObjectType, GraphQLSchema,GraphQLList, GraphQLInt, GraphQLString} = graphql
const UserType = require('./TypeDefs/UserType')
let User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const RootQuery = new GraphQLObjectType({
    name : "RootQueryType",
    fields : {
        getAllUsers : {
            type : new GraphQLList(UserType),
            args : {},
            resolve(parent, args){
            return new Promise((resolve, reject) => {
                User.find((err, user) => {
                        if (err) {
                            console.log('result in error', user)
                            reject("error")
                        }
                        else {
                            // console.log('result', user)
                            resolve(user)
                        }
                    })
                })
            }
        }
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
                return new Promise((resolve, reject) => {
                    const newUser = new User({
                        firstname : args.firstname, 
                        lastname : args.lastname, 
                        email : args.email, 
                        password : args.password
                    })
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
                                password : args.password
                            })
                            resolve({
                                firstname : args.firstname, 
                                lastname : args.lastname, 
                                email : args.email, 
                                password : args.password
                            })
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
                    User.findOne({email : args.email, password : args.password}, (err, user) => {
                        if (err) {
                            console.log('result in error', err)
                            reject({error : "Invalid username or password"})
                        }
                        else {
                            const token = jwt.sign({_id : user._id }, "dhvbhcvbhd")
                            // console.log(token)
                            resolve({ token : token })
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
    }
})
  
module.exports = new GraphQLSchema({query : RootQuery, mutation : Mutation})
  