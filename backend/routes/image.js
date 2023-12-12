const express = require('express');
const router = express.Router(); // call the Router method, which returns a router object, which we store in the router constant

const auth = require('../middleware/auth'); // import the object exported from middleware/auth.js
const multer = require('../middleware/multer-config'); // import the object exported from middleware/multer-config.js

const stuffCtrl = require('../controllers/image'); // import the object exported from controllers/stuff.js

router.get('/', auth, stuffCtrl.getAllStuff);  // call the get method, which adds a route to the router object, the auth middleware is executed before the getAllStuff function, to handle GET requests to the /api/stuff endpoint referencing the getAllStuff function in controllers/stuff.js

router.post('/', auth, multer, stuffCtrl.createImage); // call the post method, which adds a route to the router object, to handle POST requests to the /api/stuff endpoint referencing the createImage function in controllers/stuff.js

router.get('/:id', auth, stuffCtrl.getOneImage); // call the get method, which adds a route to the router object, to handle GET requests to the /:id endpoint referencing the getOneImage function in controllers/stuff.js

router.put('/:id', auth, multer, stuffCtrl.modifyImage); // call the put method, which adds a route to the router object, to handle PUT requests to the /:id endpoint referencing the modifyImage function in controllers/stuff.js

router.delete('/:id', auth, stuffCtrl.deleteImage); // call the delete method, which adds a route to the router object, to handle DELETE requests to the /:id endpoint referencing the deleteImage function in controllers/stuff.js

module.exports = router; // export the router object, so it can be used by other code, e.g. app.jsn