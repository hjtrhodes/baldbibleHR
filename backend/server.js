const http = require('http'); // import http module, to make our app an http server 
const app = require('./app'); // import the app object, which is exported from app.js

const normalisePort = val => { // define a function to normalise the port number
  const port = parseInt(val, 10); // parse the port number as an integer

  if (isNaN(port)) { // if the port number is not a number
    return val; // return the port number
  }
  
  if (port >= 0) { // if the port number is greater than or equal to 0
    return port; // return the port number
  }
  
  return false; // otherwise, return false
};

const port = normalisePort(process.env.PORT || '8080'); // set the port property of the app object to 3000, or to the environment variable PORT, if it exists

app.set('port', port); // set the port property of the app object to the port variable

const errorHandler = error => { // define a function to handle errors
  if (error.syscall !== 'listen') { // if the error is not a listen error
    throw error; // throw the error
  }

  const address = server.address(); // call the server object's address method, which returns an object with an address and a port property
  const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`; // set the bind variable to the address property of the address object, if it is a string, or to the port property of the address object, if it is not a string
  switch (error.code) { // switch on the error code
    case 'EACCES': // if the error code is EACCES
      console.error(`${bind} requires elevated privileges.`); // log a message to the console
      process.exit(1); // exit the process with an exit code of 1
      break; // break out of the switch statement
    case 'EADDRINUSE': // if the error code is EADDRINUSE
      console.error(`${bind} is already in use.`); // log a message to the console
      process.exit(1); // exit the process with an exit code of 1
      break; // break out of the switch statement
    default: // if the error code is not EACCES or EADDRINUSE
      throw error; // throw the error
  }
};

// call the http module's createServer method, which returns an object with a listen method
const server = http.createServer(app); // pass the app object as an argument to the createServer method

server.on('error', errorHandler); // call the server object's on method, which adds an event listener to the server object, to handle errors

server.on('listening', () => { // call the server object's on method, which adds an event listener to the server object, to handle the listening event
  const address = server.address(); // call the server object's address method, which returns an object with an address and a port property
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`; // set the bind variable to the address property of the address object, if it is a string, or to the port property of the address object, if it is not a string
  console.log(`Listening on ${bind}`); // log a message to the console
});

server.listen(port); // listen on port 3000, and log a message to the console when the server starts running