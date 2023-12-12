const Thing = require('../models/thing'); // import the Mongoose Thing model Schmea from thing.js
const fs = require('fs'); // import the fs package
// The fs package is used to modify the file system.

exports.createThing = (req, res, next) => { // call the post method, which adds a route to the router object, to handle POST requests to the /api/stuff endpoint
  const url = req.protocol + '://' + req.get('host'); // set the url constant to the protocol and host of the request
  req.body.thing = JSON.parse(req.body.thing); // parse the request body
  const thing = new Thing({ // create a new Thing object, using the Thing model
    title: req.body.thing.title, // set the title property of the Thing object to the title property of the request body
    description: req.body.thing.description, // set the description property of the Thing object to the description property of the request body
    imageUrl: url + '/images/' + req.file.filename, // set the imageUrl property of the Thing object to the imageUrl property of the request body
    price: req.body.thing.price, // set the price property of the Thing object to the price property of the request body
    userId: req.body.thing.userId, // set the userId property of the Thing object to the userId property of the request body
  }); // end of const thing = new Thing({ ... })
  thing.save() // call the save method, which saves the Thing object to the database
    .then(() => res.status(201).json({ message: 'Thing saved successfully!' })) // call the then method, which adds a callback function to the promise, to handle the success case
    .catch(error => res.status(400).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}

exports.getOneThing = (req, res, next) => { // call the get method, which adds a route to the router object, to handle GET requests to the /:id endpoint
  Thing.findOne({ _id: req.params.id }) // call the findOne method, which returns a promise, which resolves to the Thing object with the specified id
    .then(thing => res.status(200).json(thing)) // call the then method, which adds a callback function to the promise, to handle the success case
    .catch(error => res.status(404).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}

exports.modifyThing = (req, res, next) => { // call the put method, which adds a route to the router object, to handle PUT requests to the /:id endpoint
  let thing = new Thing({ _id: req.params._id }); // create a new Thing object, using the Thing model
  if (req.file) { // if the request contains a file
    const url = req.protocol + '://' + req.get('host'); // set the url constant to the protocol and host of the request
    req.body.thing = JSON.parse(req.body.thing); // parse the request body
    thing = { // set the thing object to an object with the following properties
      _id: req.params.id, // set the _id property of the Thing object to the id property of the request parameters
      title: req.body.thing.title, // set the title property of the Thing object to the title property of the request body
      description: req.body.thing.description, // set the description property of the Thing object to the description property of the request body
      imageUrl: url + '/images/' + req.file.filename, // set the imageUrl property of the Thing object to the imageUrl property of the request body
      price: req.body.thing.price, // set the price property of the Thing object to the price property of the request body
      userId: req.body.thing.userId, // set the userId property of the Thing object to the userId property of the request body
    }; // end of thing = { ... }
  } else { // if the request does not contain a file
    thing = { // set the thing object to an object with the following properties
      _id: req.params.id, // set the _id property of the Thing object to the id property of the request parameters
      title: req.body.title, // set the title property of the Thing object to the title property of the request body
      description: req.body.description, // set the description property of the Thing object to the description property of the request body
      imageUrl: req.body.imageUrl, // set the imageUrl property of the Thing object to the imageUrl property of the request body
      price: req.body.price, // set the price property of the Thing object to the price property of the request body
      userId: req.body.userId, // set the userId property of the Thing object to the userId property of the request body
    }; // end of thing = { ... }
  } // end of if (req.file) { ... } else { ... }
  Thing.updateOne({ _id: req.params.id }, thing) // call the updateOne method, which returns a promise, which resolves to the Thing object with the specified id
    .then(() => res.status(201).json({ message: 'Thing updated successfully!' })) // call the then method, which adds a callback function to the promise, to handle the success case
    .catch(error => res.status(400).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}

exports.deleteThing = (req, res, next) => { // call the delete method, which adds a route to the router object, to handle DELETE requests to the /:id endpoint
  Thing.findOne({ _id: req.params.id }) // call the findOne method, which returns a promise, which resolves to the Thing object with the specified id
    .then(thing => { // call the then method, which adds a callback function to the promise, to handle the success case
      if (!thing) { // if the thing does not exist
        return res.status(404).json({ error: 'Thing not found!' }); // return a 404 Not Found error
      } // end of if (!thing) { ... }
      if (thing.userId !== req.auth.userId) { // if the userId property of the Thing object does not match the userId property of the request body
        return res.status(401).json({ error: 'Unauthorized request!' }); // return a 401 Unauthorized error
      } // end of if (thing.userId !== req.auth.userId) { ... }
      const filename = thing.imageUrl.split('/images/')[1]; // set the filename constant to the second element of the array returned by splitting the imageUrl property of the Thing object
      fs.unlink('images/' + filename, () => { // call the unlink method, which deletes the file with the specified path
        Thing.deleteOne({ _id: req.params.id }) // call the deleteOne method, which returns a promise, which resolves to the Thing object with the specified id
          .then(() => res.status(200).json({ message: 'Deleted!' })) // call the then method, which adds a callback function to the promise, to handle the success case
          .catch(error => res.status(400).json({
            error: error
          })) // call the catch method, which adds a callback function to the promise, to handle the failure case
        }); // end of .then(thing => { ... })
    })
};

exports.getAllStuff = (req, res, next) => { // call the get method, which adds a route to the router object, to handle GET requests to the /api/stuff endpoint
  Thing.find() // call the find method, which returns a promise, which resolves to an array of all the Thing objects in the database
    .then(things => res.status(200).json(things)) // call the then method, which adds a callback function to the promise, to handle the success case
    .catch(error => res.status(400).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}