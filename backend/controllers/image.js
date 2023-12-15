const Images = require('../models/image'); // import the Mongoose Image model Schmea from image.js
const fs = require('fs'); // import the fs package
// The fs package is used to modify the file system.

exports.createImage = (req, res, next) => { // call the post method, which adds a route to the router object, to handle POST requests to the /api/stuff endpoint
  const url = req.protocol + '://' + req.get('host'); // set the url constant to the protocol and host of the request
  req.body.image = JSON.parse(req.body.image); // parse the request body
  const image = new Image({ // create a new Image object, using the Image model
    description: req.body.image.description, // set the description property of the Image object to the description property of the request body
    ImageUrl: url + '/Images/' + req.file.filename, // set the ImageUrl property of the Image object to the ImageUrl property of the request body
    userId: req.body.image.userId, // set the userId property of the Image object to the userId property of the request body
  }); // end of const image = new Image({ ... })
  image.save() // call the save method, which saves the Image object to the database
    .then(() => res.status(201).json({ message: 'Image saved successfully!' })) // call the then method, which adds a callback function to the promise, to handle the success case
    .catch(error => res.status(400).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}

exports.getOneImage = (req, res, next) => { // call the get method, which adds a route to the router object, to handle GET requests to the /:id endpoint
  Image.findOne({ _id: req.params.id }) // call the findOne method, which returns a promise, which resolves to the Image object with the specified id
    .then(image => res.status(200).json(image)) // call the then method, which adds a callback function to the promise, to handle the success case
    .catch(error => res.status(404).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}

exports.modifyImage = (req, res, next) => { // call the put method, which adds a route to the router object, to handle PUT requests to the /:id endpoint
  let image = new Image({ _id: req.params._id }); // create a new Image object, using the Image model
  if (req.file) { // if the request contains a file
    const url = req.protocol + '://' + req.get('host'); // set the url constant to the protocol and host of the request
    req.body.image = JSON.parse(req.body.image); // parse the request body
    image = { // set the image object to an object with the following properties
      _id: req.params.id, // set the _id property of the Image object to the id property of the request parameters
      description: req.body.image.description, // set the description property of the Image object to the description property of the request body
      ImageUrl: url + '/Images/' + req.file.filename, // set the ImageUrl property of the Image object to the ImageUrl property of the request body
      userId: req.body.image.userId, // set the userId property of the Image object to the userId property of the request body
    }; // end of image = { ... }
  } else { // if the request does not contain a file
    image = { // set the image object to an object with the following properties
      _id: req.params.id, // set the _id property of the Image object to the id property of the request parameters
      description: req.body.description, // set the description property of the Image object to the description property of the request body
      ImageUrl: req.body.ImageUrl, // set the ImageUrl property of the Image object to the ImageUrl property of the request body
      userId: req.body.userId, // set the userId property of the Image object to the userId property of the request body
    }; // end of image = { ... }
  } // end of if (req.file) { ... } else { ... }
  Image.updateOne({ _id: req.params.id }, image) // call the updateOne method, which returns a promise, which resolves to the Image object with the specified id
    .then(() => res.status(201).json({ message: 'Image updated successfully!' })) // call the then method, which adds a callback function to the promise, to handle the success case
    .catch(error => res.status(400).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}

exports.deleteImage = (req, res, next) => { // call the delete method, which adds a route to the router object, to handle DELETE requests to the /:id endpoint
  Image.findOne({ _id: req.params.id }) // call the findOne method, which returns a promise, which resolves to the Image object with the specified id
    .then(image => { // call the then method, which adds a callback function to the promise, to handle the success case
      if (!image) { // if the image does not exist
        return res.status(404).json({ error: 'Image not found!' }); // return a 404 Not Found error
      } // end of if (!image) { ... }
      if (image.userId !== req.auth.userId) { // if the userId property of the Image object does not match the userId property of the request body
        return res.status(401).json({ error: 'Unauthorized request!' }); // return a 401 Unauthorized error
      } // end of if (image.userId !== req.auth.userId) { ... }
      const filename = image.ImageUrl.split('/Images/')[1]; // set the filename constant to the second element of the array returned by splitting the ImageUrl property of the Image object
      fs.unlink('Images/' + filename, () => { // call the unlink method, which deletes the file with the specified path
        Image.deleteOne({ _id: req.params.id }) // call the deleteOne method, which returns a promise, which resolves to the Image object with the specified id
          .then(() => res.status(200).json({ message: 'Deleted!' })) // call the then method, which adds a callback function to the promise, to handle the success case
          .catch(error => res.status(400).json({
            error: error
          })) // call the catch method, which adds a callback function to the promise, to handle the failure case
        }); // end of .then(image => { ... })
    })
};

exports.getAllStuff = (req, res, next) => { // call the get method, which adds a route to the router object, to handle GET requests to the /api/stuff endpoint
  Image.find() // call the find method, which returns a promise, which resolves to an array of all the Image objects in the database
    .then(images => res.status(200).json(images)) // call the then method, which adds a callback function to the promise, to handle the success case
    .catch(error => res.status(400).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}


exports.Likes = (req, res) => {
  const newLike = req.body.likes;

  Post.findOneAndUpdate(
    { _id: req.params.id }, 
    { $inc: { likes: newLike } }, 
    { new: true }, 
    (err, updatedImage) => {
      if (err) {
        console.error('Like not added:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        const token = TokenGenerator.jsonwebtoken(req.user_id)
        res.status(201).json({ message: 'Like added successfully', token: token, updatedImage });
      }
    }
  );
},


exports.GetLikes = async (req, res) => {
  try {
      const imageId = req.params.id;
      const image = await Post.findById(postId);

      if (!image) {
          return res.status(404).json({ error: 'Image not found' });
      }

      const likes = image.likes;
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ likes, token });
  } catch (err) {
      console.error('Error retrieving image likes:', err);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};