const express = require('express'); 
const mongoose = require('mongoose'); 
const path = require('path'); // import path module, to deal with file paths
const cors = require('cors');

let password;

try {
  // Try to use local config
  const localConfig = require('./config');
  password = localConfig.password;
} catch (error) {
  // If local config is not available, use environment variable
  password = process.env.DB_PASSWORD;
}

const imageRoutes = require('./routes/image'); // import the router object, which is exported from stuff.js
const userRoutes = require('./routes/user'); // import the router object, which is exported from user.js

const app = express(); // call the express function, which returns an object with a listen method


const { error } = require("console");
app.use(cors({
  origin: ['https://baldbible-s8q0.onrender.com:5173', 'http://localhost:5173'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
// call the use method, which adds a middleware function to the middleware stack, to deal with the CORS policy
// const bodyParser = require("body-parser");
// app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// call the use method, which adds a middleware function to the middleware stack, to parse the request body
// express.json() intercepts every request with json data content type, take the request  body and put it onto the request object as the body property.

const dbname = process.env.MONGO_URL || 'baldbible'

mongoose.connect(`mongodb+srv://hjtrhodes:${password}@baldbible.bqmaqxk.mongodb.net/${dbname}?retryWrites=true&w=majority`)

  .then(() => { // call the then method, which adds a callback function to the promise, to handle the success case
    console.log('Successfully connected to MongoDB Atlas!'); // log a message to the console
  })
  .catch((error) => { // call the catch method, which adds a callback function to the promise, to handle the failure case
    console.log('Unable to connect to MongoDB Atlas!', error.message); // log a message to the console
    console.error(error); // log the error to the console
  });
  
app.use(express.json()); // call the use method, which adds a middleware function to the middleware stack, to parse the request body
// express.json() intercepts every request with json data content type, take the request  body and put it onto the request object as the body property.

app.use("/images", express.static(path.join(__dirname, "images"))); // call the use method, which adds a middleware function to the middleware stack, to serve the images in the images folder

app.use("/api/image", imageRoutes); // call the use method, which adds a middleware function to the middleware stack, to handle requests to the /api/stuff endpoint
app.use("/api/images", imageRoutes);
app.use("/api/auth", userRoutes); // call the use method, which adds a middleware function to the middleware stack, to handle requests to the /api/auth endpoint
app.get("/api/health", async (req, res) => {
  try {
    // Check database connection status
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ message: "The server is running. Database is connected." });
  } catch (error) {
    res.status(500).json({ message: "The server is running. Database connection failed." });
  }
});



module.exports = app;