const express = require('express');
const router = express.Router(); // call the Router method, which returns a router object, which we store in the router constant
const cloudinary = require("../cloudinary/cloudinary");
const auth = require('../middleware/auth'); // import the object exported from middleware/auth.js
const multer = require('../middleware/multer-config'); // import the object exported from middleware/multer-config.js

const ImageController = require("../controllers/upload")

router.post("/upload", ImageController.Upload);

module.exports = router; // export the router object, so it can be used by other code, e.g. app.jsn