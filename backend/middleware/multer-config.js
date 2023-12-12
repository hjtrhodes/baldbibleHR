const multer = require('multer');

const MIME_TYPES = { // define a constant, which is an object containing the MIME types that we want to accept
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
}; // the MIME types are the types of files that can be uploaded, e.g. images, videos, audio, etc.

const storage = multer.diskStorage({ // configure the storage engine
  destination: (req, file, callback) => { // configure the destination folder
    callback(null, 'images'); // call the callback function, which takes an error and a destination folder
  },
  filename: (req, file, callback) => { // configure the file name
    const name = file.originalname.split(' ').join('_'); // get the original file name, and replace spaces with underscores
    const extension = MIME_TYPES[file.mimetype]; // get the MIME type of the file, and get the corresponding file extension from the MIME_TYPES object
    callback(null, name + Date.now() + '.' + extension); // call the callback function, which takes an error and a file name
  }
});

module.exports = multer({ storage: storage }).single('image'); // export the multer middleware configured with the storage engine, and set the single method to accept a single file with the name 'image'
// The multer middleware will be executed before the createThing and modifyThing functions in controllers/stuff.js.