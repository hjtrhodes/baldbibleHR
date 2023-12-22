const express = require('express'); 
const mongoose = require('mongoose'); 
const path = require('path');

const { password }  = require('./config');

const imageRoutes = require('./routes/image'); // import the router object, which is exported from stuff.js
const userRoutes = require('./routes/user'); // import the router object, which is exported from user.js

const app = express();

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

  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
});

app.use('/images', express.static(path.join(__dirname, 'images'))); // call the use method, which adds a middleware function to the middleware stack, to serve the images in the images folder

app.use('/api/stuff', stuffRoutes); // call the use method, which adds a middleware function to the middleware stack, to handle requests to the /api/stuff endpoint
app.use('/api/auth', userRoutes); // call the use method, which adds a middleware function to the middleware stack, to handle requests to the /api/auth endpoint
app.get('/api/health', (req, res) => { 
  res.status(200).json({ message: 'The server is running. All is good.' });
});

app.post("/", async(req,res)=> {
  const {image} = req.body;
  cloudinary.uploader.upload(image,{ 
    upload_preset: 'unsigned_upload',
    public_id: `${username}avatar`,
    allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfig', 'webp' ]
  },
  function(error, result) {console.log(result); });
  res.json("I have recieved your data")
})


module.exports = app;