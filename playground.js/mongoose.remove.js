const{ObjectID} = require('mongodb');
const{mongoose} = require('./../server/db/mongoose');
const{Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/user');

//To remove everythind
 // Todo.remove({}).then((result) => {
 //   console.log(result);
 // });

// in this we get docs back
//Todo.findOneAndRemove
//&&
//Todo.findByIdAndRemove


Todo.findOneAndRemove({_id:'58b30b0cf73fe14354c6ac34' }).then((todo) => {
    console.log(todo);
})

// Todo.findByIdAndRemove('58b31259e20b6b4708c1e8ac').then((todo) => {
//   console.log(todo);
// });
