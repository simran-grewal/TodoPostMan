var mongoose = require('mongoose');


// mongoose model
                       // name
var Todo = mongoose.model('Todo', {
//Properties

text: {

    type: String,
    required: true, // validatios:)
    minlength:1,
    trim: true // to remove un neccessary spaces

},

completed: {

  type: Boolean,
  default: false
},

completedAt: {

type: Number,
default: null
}

});

module.exports = {
  Todo
};
