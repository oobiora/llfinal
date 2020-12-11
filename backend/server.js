// include required libraries 'express cors'
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//require mongo db
const mongoose = require('mongoose');

// include dotenv config 
require('dotenv').config();

// crate express server, and port variable
const app = express();
const port = process.env.PORT || 5000;

// initialize server with with cors and json middleware
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json()); // incudes body-parser
app.use(cookieParser())

// connect to mongoDB Atlas URI
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

//establish mongoDB connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// require workout and users for CRUD opperations
const usersRouter = require('./routes/users');
const workoutRouter = require('./routes/workouts');

//user user and workout routers with schema
app.use('/users', usersRouter);
app.use('/api/workouts', workoutRouter)
// app.use('/workouts', workoutRouter);

//error handling middlware
app.use(function(err, req, res, next){
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500 // set defualt error code
    res.status(err.statusCode).send(err.message); // send status code and message
})


// starts server to listen on port
app.listen(port, () => {
    console.log(`Server is running on port:  ${port}`); // console log port number
})

