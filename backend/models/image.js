const mongoose = require("mongoose"); // import mongoose

const photoSchema = mongoose.Schema({
  // define a schema for things
  // description: { type: String, required: true }, // define a description property, which is a required string
  imageUrl: { type: String }, // define an imageUrl property, which is a required string
  userId: { type: String }, // define a userId property, which is a required string
  username: { type: String },
  dateAdded: { type: String },
  likedByUser: { type: [String], default: [] },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model("Images", photoSchema); // export the model, which is created from the schema, and give it the name 'Thing'
// The model is exported so it can be used by other code, e.g. our routes.
// The two arguments passed to the model method are the name of the model, and the schema to use.

// Compare this snippet from app.js:
// const Thing = require('./models/thing'); // import the Thing model, which is exported from thing.jsgit
