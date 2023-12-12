const jwt = require('jsonwebtoken'); // import jsonwebtoken

module.exports = (req, res, next) => { // export a function that takes the request, response, and next arguments
  try { // try to execute the following code
    const token = req.headers.authorization.split(' ')[1]; // get the token from the authorization header
    // the authoriastion also includes the word Bear, which we don't need, so we split the string into an array, and get the second element
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // verify the token with two arguments: the token, and the secret key used to generate the token
    const userId = decodedToken.userId; // get the userId from the decoded token
    req.auth = { userId: userId }; // set the auth property of the request to an object with a userId property
    if (req.body.userId && req.body.userId !== userId) { // if the request body contains a userId property, and it does not match the userId from the decoded token
      throw 'Invalid user ID'; // throw an error
    } else { // if the request body does not contain a userId property, OR it does and it matches the userId from the decoded token
      next(); // all is in order SO, call the next function which will be executed in the middleware stack

    } // end of if (req.body.userId && req.body.userId !== userId) { ... } else { ... }
  } catch { // if the try block throws an error, execute the following code
    res.status(401).json({ // return a 401 Unauthorized error and a JSON object
      error: new Error('Invalid request!') // set the error property of the JSON object to a new Error object
    }); // end of res.status(401).json({ ... })
  } // end of try { ... } catch { ... }
}; // end of module.exports = (req, res, next) => { ... }