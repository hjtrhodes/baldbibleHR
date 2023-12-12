const mongoose = require('mongoose'); // import mongoose
const uniqueValidator = require('mongoose-unique-validator'); // import mongoose-unique-validator

const userSchema = mongoose.Schema({ // define a schema for users
  email: { type: String, required: true, unique: true }, // define an email property, which is a required string and must be unique
  password: { type: String, required: true }, // define a password property, which is a required string
});

userSchema.plugin(uniqueValidator); // call the plugin method, which adds the uniqueValidator plugin to the schema
// The uniqueValidator plugin validates that the email property is unique before saving the user to the database.
// The uniqueValidator plugin adds a pre-save validation hook for unique fields within a Mongoose schema.
// The uniqueValidator plugin is not a validator in the strictest sense. It is a pre-save hook that validates unique fields.
// The uniqueValidator plugin is not run by default, it needs to be installed and configured.
// The uniqueValidator plugin is not run on update(), findOneAndUpdate() etc. by default, only on save().
// The uniqueValidator plugin is not run on update() etc. by default, because it is a document middleware, not a query middleware.

module.exports = mongoose.model('User', userSchema); // export the model, which is created from the schema, and give it the name 'User'

