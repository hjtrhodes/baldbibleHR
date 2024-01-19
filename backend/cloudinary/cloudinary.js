const cloudinary = require('cloudinary').v2; 
let cloudinaryConfig;

try {
  // Try to use local config
  cloudinaryConfig = require('../config');
} catch (error) {
  // If local config is not available, use environment variables
  cloudinaryConfig = {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_KEY: process.env.CLOUD_KEY,
    CLOUD_SECRET: process.env.CLOUD_SECRET
  };
}

cloudinary.config({
  cloud_name: cloudinaryConfig.CLOUD_NAME,
  api_key: cloudinaryConfig.CLOUD_KEY,
  api_secret: cloudinaryConfig.CLOUD_SECRET,
  secure: true
});

module.exports = cloudinary