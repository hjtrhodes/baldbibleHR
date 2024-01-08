const Comment = require('../models/comment');
const Image = require('../models/image');
const jwt = require('jsonwebtoken'); // import jsonwebtoken


exports.addComment = async (req, res, next) => {
  try {
    const { userId, content } = req.body;
    const imageId = req.params.imageId;

    // Check if the image exists
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const comment = new Comment({
      userId,
      imageId,
      content,
    });

    await comment.save();

    res.status(201).json({ message: 'Comment added successfully!' });
  } catch (error) {
    res.status(400).json({ error });
  }
};


