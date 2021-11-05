const express = require('express');

//Cross-Origin-Resource-Sharing
const cors = require('cors');
const mongoose = require('mongoose')

//Configuring Environment Variables
require('dotenv').config();

//Creating Express Server
const app = express();
const port = process.env.PORT || 5000;

//Middleware for cors and parsing json
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology : true})
const connection = mongoose.connection

connection.once('open' , () => {
    console.log("connected to mongo")
})

//Starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});