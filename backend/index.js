var express = require('express')
var app = express()

//Cross-Origin-Resource-Sharing
const cors = require('cors')

const {signupUser} = require('./routes/users')

var mysql = require('mysql')
var config = require('./config.json')

//cors middleware
app.use(cors())
app.use(express.json()) //since server will send and receive json

//users routes
app.post('/api/signup' , signupUser)

var con = mysql.createPool({                                                                                                                                                                                                                                    
  host: config.DB.host,
  user: config.DB.username,
  password: config.DB.password,
  port: config.DB.port,
  database: config.DB.database
})

app.listen(5000)
con.getConnection(function(err) {
  if (err) throw err
  console.log("Connected!")
})

module.exports = app