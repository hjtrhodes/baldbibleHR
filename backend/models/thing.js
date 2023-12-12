const mongoose = require('mongoose'); // import mongoose

const thingSchema = mongoose.Schema({ // define a schema for things
  title: { type: String, required: true }, // define a title property, which is a required string
  description: { type: String, required: true }, // define a description property, which is a required string
  imageUrl: { type: String, required: true }, // define an imageUrl property, which is a required string
  price: { type: Number, required: true }, // define a price property, which is a required number
  userId: { type: String, required: true }, // define a userId property, which is a required string
});

module.exports = mongoose.model('Thing', thingSchema); // export the model, which is created from the schema, and give it the name 'Thing'
// The model is exported so it can be used by other code, e.g. our routes.
// The two arguments passed to the model method are the name of the model, and the schema to use.

// Compare this snippet from app.js:
// const Thing = require('./models/thing'); // import the Thing model, which is exported from thing.jsgit 