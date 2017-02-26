var express = require('express');
var bodyParser = require('body-parser');
var{mongoose} = require('./db/mongoose');
var{Todo} = require('./models/todo');
var{User} = require('./models/user');

var app = express();

app.use(bodyParser.json());  /// middleWare in  json to give to express
app.use(bodyParser.urlencoded({extended: false}));
app.post('/todos', (req, res) => {

    var todo = new Todo({
      text: req.body.text
     });

    todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
      res.status(400).send(e);
    });

  //console.log(req.body);

});
app.listen(3000, () => {
  console.log('Port 3000 is up');
});

















// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable  To save todo');
// });

//
// var newTodo = new Todo({
//   text: 'Simran Grewal',
//   //completed: true,
//   // completedAt: 20
// })
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) =>  {
//       console.log('Unable to Save Todo');
// })
//
//
// var OtherTodo = new Todo({
//   text: 'Feed the cat',
//   completed: true,
//   completedAt: 1234
// });
//
// OtherTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save Todo');
// })
