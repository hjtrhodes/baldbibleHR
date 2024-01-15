const express = require('express'); 
const mongoose = require('mongoose'); 
const path = require('path'); // import path module, to deal with file paths
const cors = require('cors');
const { password }  = require('./config'); // import the password property of the object exported from config.js
// the password in config.js is the password for the user pablojoyce, which has read and write access to the database

const imageRoutes = require('./routes/image'); // import the router object, which is exported from stuff.js
const userRoutes = require('./routes/user'); // import the router object, which is exported from user.js

const app = express(); // call the express function, which returns an object with a listen method


const { error } = require("console");
app.use(cors());
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
    console.log('Unable to connect to MongoDB Atlas!'); // log a message to the console
    console.error(error); // log the error to the console
  });
  
app.use(express.json()); // call the use method, which adds a middleware function to the middleware stack, to parse the request body
// express.json() intercepts every request with json data content type, take the request  body and put it onto the request object as the body property.



// The following code is executed for every incoming request
// The three res.setHeader() methods set the response headers which allow the client to access the API and deal with the CORS policy. Cross Origin Resource Sharing (CORS) is a security mechanism which restricts HTTP requests made from scripts to resources in a different origin. An origin is a combination of a protocol, a domain name and a port number. For example, http://localhost:3000 is an origin. The CORS policy is enforced by the browser. The browser sends an OPTIONS request to the server, to check if the client is allowed to access the API. The server responds with the Access-Control-Allow-Origin header, which tells the browser if the client is allowed to access the API. If the client is allowed to access the API, the browser sends the actual request. The server responds with the requested data. If the client is not allowed to access the API, the browser does not send the actual request. Instead, it sends an error message to the console.
app.use((req, res, next) => {
  // call the use method, which adds a middleware function to the middleware stack
  // set the response header to allow all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  // set the response header to allow the following headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // set the response header to allow the following methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  // call the next function which will be executed in the middleware stack
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use("/images", express.static(path.join(__dirname, "images"))); // call the use method, which adds a middleware function to the middleware stack, to serve the images in the images folder

app.use("/api/image", imageRoutes); // call the use method, which adds a middleware function to the middleware stack, to handle requests to the /api/stuff endpoint
app.use("/api/images", imageRoutes);
app.use("/api/auth", userRoutes); // call the use method, which adds a middleware function to the middleware stack, to handle requests to the /api/auth endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "The server is running. All is good." });
});
// app.post("/upload", async (req, res) => {
//   const { image } = req.body;
//   try {
//     const uploadedImage = await cloudinary.uploader.upload(image, {
//       upload_preset: "unsigned_upload",
//       allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfig", "webp"],
//     });
//     res.status(200).json(uploadedImage);
//     console.log(uploadedImage)
//     req.body.imageURL = uploadedImage.secure_url
//     const NewUpload = new Image(req.body)
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/", async(req,res)=> {
//   const {image} = req.body;
//   cloudinary.uploader.upload(image,{ 
//     upload_preset: 'unsigned_upload',
//     public_id: `${username}avatar`,
//     allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfig', 'webp' ]
//   },
//   function(error, result) {console.log(result); });
//   res.json("I have recieved your data")
// })


module.exports = app;