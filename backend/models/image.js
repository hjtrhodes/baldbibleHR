const mongoose = require('mongoose'); // import mongoose

const thingSchema = mongoose.Schema({ // define a schema for things
  description: { type: String  }, // define a description property, which is a required string
  imageUrl: { type: String }, // define an imageUrl property, which is a required string
  userId: { type: String }, // define a userId property, which is a required string
  likedByUser: { type: [String], default: [] },
});

module.exports = mongoose.model('Images', thingSchema); // export the model, which is created from the schema, and give it the name 'Thing'
// The model is exported so it can be used by other code, e.g. our routes.
// The two arguments passed to the model method are the name of the model, and the schema to use.

// Compare this snippet from app.js:
// const Thing = require('./models/thing'); // import the Thing model, which is exported from thing.jsgit 