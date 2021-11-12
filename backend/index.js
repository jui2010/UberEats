const express = require('express')

//Cross-Origin-Resource-Sharing
const cors = require('cors')
// var kafka = require('./kafka/client')
const mongoose = require('mongoose')

//Configuring Environment Variables
require('dotenv').config();

//Creating Express Server
const app = express()
const port = process.env.PORT || 5000

// Routes
const usersRouter = require('./routes/users')
const authUsersRouter = require('./routes/authUsers')
const restaurantsRouter = require('./routes/restaurants')
const authRestaurantsRouter = require('./routes/authRestaurants')
const mongoAuth = require('./routes/mongoAuth')
const mongoRestAuth = require('./routes/mongoRestAuth')

//Middleware for cors and parsing json
app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology : true})
const connection = mongoose.connection

app.use('/api/user/' , usersRouter)
app.use('/api/authUser/' , mongoAuth, authUsersRouter)
app.use('/api/restaurant/', restaurantsRouter)
app.use('/api/authRestaurant/' , mongoRestAuth, authRestaurantsRouter)

connection.once('open' , () => {
    console.log("connected to mongo")
})

//Starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});