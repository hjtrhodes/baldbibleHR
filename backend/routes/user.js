const express = require('express');
const router = express.Router(); // call the Router method, which returns a router object, which we store in the router constant

const userCtrl = require('../controllers/user'); // import the object exported from controllers/user.js

router.post('/signup', userCtrl.signup); // call the post method, which adds a route to the router object, to handle POST requests to the /api/auth/signup endpoint referencing the signup function in controllers/user.js
router.post('/login', userCtrl.login); // call the post method, which adds a route to the router object, to handle POST requests to the /api/auth/login endpoint referencing the login function in controllers/user.js

module.exports = router; // export the router object, so it can be used by other code, e.g. app.js

