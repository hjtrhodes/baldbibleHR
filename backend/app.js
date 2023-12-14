const express = require('express'); 
const mongoose = require('mongoose'); 
const path = require('path');

const { password }  = require('./config');

const stuffRoutes = require('./routes/image');
const userRoutes = require('./routes/user');

const app = express();

const cors = require("cors")

mongoose.connect(`mongodb+srv://team3-baldbible:${password}@bald-bible-database.vqxy3e3.mongodb.net/baldbible?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });
  
app.use(cors());
app.use(express.json({limit: '50mb'})); 
app.use(express.urlencoded({extended : true, limit: '50mb'}))

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*'); 

  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
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