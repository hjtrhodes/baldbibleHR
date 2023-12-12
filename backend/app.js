const express = require('express'); // import express module, to make our app an express server
const mongoose = require('mongoose'); // import mongoose module, to connect to MongoDB database
// mongoose is an ODM (Object Document Mapper) for MongoDB and Node.js. It allows us to interact with the MongoDB database in an object-oriented way. It provides a schema-based solution to model our application data with MongoDB. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
// const cors = require('cors'); // import cors module, to deal with the CORS policy
const path = require('path'); // import path module, to deal with file paths

const { password }  = require('./config'); // import the password property of the object exported from config.js
// the password in config.js is the password for the user pablojoyce, which has read and write access to the database

const stuffRoutes = require('./routes/stuff'); // import the router object, which is exported from stuff.js
const userRoutes = require('./routes/user'); // import the router object, which is exported from user.js

const app = express(); // call the express function, which returns an object with a listen method

// app.use(cors()); // call the use method, which adds a middleware function to the middleware stack, to deal with the CORS policy

mongoose.connect(`mongodb+srv://pablojoyce:${password}@gofullstack.se9tvhr.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => { // call the then method, which adds a callback function to the promise, to handle the success case
    console.log('Successfully connected to MongoDB Atlas!'); // log a message to the console
  })
  .catch((error) => { // call the catch method, which adds a callback function to the promise, to handle the failure case
    console.log('Unable to connect to MongoDB Atlas!'); // log a message to the console
    console.error(error); // log the error to the console
  });
  
app.use(express.json()); // call the use method, which adds a middleware function to the middleware stack, to parse the request body
// express.json() intercepts every request with json data content type, take the request  body and put it onto the request object as the body property.

// The following code is executed for every incoming request
// The three res.setHeader() methods set the response headers which allow the client to access the API and deal with the CORS policy. Cross Origin Resource Sharing (CORS) is a security mechanism which restricts HTTP requests made from scripts to resources in a different origin. An origin is a combination of a protocol, a domain name and a port number. For example, http://localhost:3000 is an origin. The CORS policy is enforced by the browser. The browser sends an OPTIONS request to the server, to check if the client is allowed to access the API. The server responds with the Access-Control-Allow-Origin header, which tells the browser if the client is allowed to access the API. If the client is allowed to access the API, the browser sends the actual request. The server responds with the requested data. If the client is not allowed to access the API, the browser does not send the actual request. Instead, it sends an error message to the console.
app.use((req, res, next) => { // call the use method, which adds a middleware function to the middleware stack
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

module.exports = app; // export the app object, so it can be used by other code, e.g. our tests