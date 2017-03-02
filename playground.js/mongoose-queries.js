const{ObjectID} = require('mongodb');
const{mongoose} = require('./../server/db/mongoose');
const{Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/user');
var id = '58addff25db7502e689395ac';

if(!ObjectID.isValid(id))
{
return  console.log('not valid id');
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});


Todo.findById(id).then((todo) => {
  console.log('Todo', todo);
});

User.findOne({
  email: 'simrangrewal587@gmail.com'
}).then((user) => {
  console.log(user);
})
// var user = new User({
//   email: 'simrangrewal587@gmail.com'
// });
// user.save();
