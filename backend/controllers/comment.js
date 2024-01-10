const Comment = require('../models/comment');
const Image = require('../models/image');
const jwt = require('jsonwebtoken'); // import jsonwebtoken

exports.getAllComments = async (req, res, next) => {
  try {
    const imageId = req.params.id;
    console.log(req.params)
    // check if the image exists 
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' })
    }

    // Retrieve all comments for the image
    const comments = image.comments;

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error });
  }
};



exports.addComment = async (req, res, next) => {
  try {
    
    const { content } = req.body;
    const imageId = req.params.id; // problem
    // When you define a route with a parameter like :imageId, you can access its value using req.params.imageId. 
    // This allows you to dynamically handle requests based on the value provided in the URL.
    console.log( req.body)
    // Check if the image exists
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    const user = await User.findById(req.body.userId)
    console.log("user", user)
    // Add the comment to the image
    image.comments.push( content );
    console.log(image)
    await image.save();
    
    

    res.status(201).json({ message: "Comment added successfully!" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
