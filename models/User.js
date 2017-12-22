// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;


var UserSchema = new Schema({

  firstName: {
    type: String,
    unique: false,
    required: true
  },
  lastName: {
    type: String,
    unique: false,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true  
  },
  password: {
    type: String,
    unique: true,
    required: true  
  },
  email: {
    type: String,
    unique: true,
    required: true  
  }

});

var User = mongoose.model("Questions", UserSchema);

module.exports = User;
