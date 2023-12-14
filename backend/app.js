const express = require('express'); 
const mongoose = require('mongoose'); 
const path = require('path'); // import path module, to deal with file paths

const { password }  = require('./config'); // import the password property of the object exported from config.js
// the password in config.js is the password for the user pablojoyce, which has read and write access to the database

const stuffRoutes = require('./routes/image'); // import the router object, which is exported from stuff.js
const userRoutes = require('./routes/user'); // import the router object, which is exported from user.js

const app = express(); // call the express function, which returns an object with a listen method

// app.use(cors()); // call the use method, which adds a middleware function to the middleware stack, to deal with the CORS policy


mongoose.connect(`mongodb+srv://team3-baldbible:${password}@bald-bible-database.vqxy3e3.mongodb.net/baldbible?retryWrites=true&w=majority`)

  .then(() => { // call the then method, which adds a callback function to the promise, to handle the success case
    console.log('Successfully connected to MongoDB Atlas!'); // log a message to the console
  })
  .catch((error) => { // call the catch method, which adds a callback function to the promise, to handle the failure case
    console.log('Unable to connect to MongoDB Atlas!'); // log a message to the console
    console.error(error); // log the error to the console
  });
  
app.use(express.json()); 
app.use((req, res, next) => { 
  // set the response header to allow all origins
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  // set the response header to allow the following headers
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // set the response header to allow the following methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  // call the next function which will be executed in the middleware stack
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images'))); // call the use method, which adds a middleware function to the middleware stack, to serve the images in the images folder

app.use('/api/stuff', stuffRoutes); // call the use method, which adds a middleware function to the middleware stack, to handle requests to the /api/stuff endpoint
app.use('/api/auth', userRoutes); // call the use method, which adds a middleware function to the middleware stack, to handle requests to the /api/auth endpoint
app.get('/api/health', (req, res) => { 
  res.status(200).json({ message: 'The server is running. All is good.' });
});

module.exports = app; // export the app object, so it can be used by other code, e.g. our tests