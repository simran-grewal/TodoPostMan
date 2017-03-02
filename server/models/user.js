var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
var UserSchema = new mongoose.Schema({
  email: {

    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail, // it is mehod if email is valid it return true else it return false
      message: '{VALUE} is not valid email'

    }
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{   // it is how to access token arrtibute
    access:{
      type: String,
      required: true
    },
    token: {    // it is how token arrtibute should looks like
      type: String,
      required: true
    }
  }]
});

UserSchema.method.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.token.push({access, token});

  return user.save().then(() => {
      return token;

  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {

  User
};
