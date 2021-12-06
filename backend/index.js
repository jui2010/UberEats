const {ApolloServer, gql} = require('apollo-server')

//Configuring Environment Variables
const mongoose = require('mongoose')
const express = require('express')
const graphql = require('graphql')
const {GraphQLObjectType, GraphQLSchema,GraphQLList, GraphQLInt, GraphQLString} = graphql
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')
const app = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
    res.setHeader('Cache-Control', 'no-cache')
    next()
  })

require('dotenv').config()

const uri = process.env.ATLAS_URI

mongoose
  .connect(uri , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected successfully")
    // app.listen(3001)
  })
  .catch(err => {
    console.log("Could not connect to MongoDB", err)
  })

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4001, ()=>{
  console.log("GraphQL server started on port 4001")
})