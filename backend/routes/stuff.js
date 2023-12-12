const express = require('express');
const router = express.Router(); // call the Router method, which returns a router object, which we store in the router constant

const auth = require('../middleware/auth'); // import the object exported from middleware/auth.js
const multer = require('../middleware/multer-config'); // import the object exported from middleware/multer-config.js

const stuffCtrl = require('../controllers/stuff'); // import the object exported from controllers/stuff.js

router.get('/', auth, stuffCtrl.getAllStuff);  // call the get method, which adds a route to the router object, the auth middleware is executed before the getAllStuff function, to handle GET requests to the /api/stuff endpoint referencing the getAllStuff function in controllers/stuff.js

router.post('/', auth, multer, stuffCtrl.createThing); // call the post method, which adds a route to the router object, to handle POST requests to the /api/stuff endpoint referencing the createThing function in controllers/stuff.js

router.get('/:id', auth, stuffCtrl.getOneThing); // call the get method, which adds a route to the router object, to handle GET requests to the /:id endpoint referencing the getOneThing function in controllers/stuff.js

router.put('/:id', auth, multer, stuffCtrl.modifyThing); // call the put method, which adds a route to the router object, to handle PUT requests to the /:id endpoint referencing the modifyThing function in controllers/stuff.js

router.delete('/:id', auth, stuffCtrl.deleteThing); // call the delete method, which adds a route to the router object, to handle DELETE requests to the /:id endpoint referencing the deleteThing function in controllers/stuff.js

module.exports = router; // export the router object, so it can be used by other code, e.g. app.js