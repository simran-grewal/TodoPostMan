const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var{mongoose} = require('./db/mongoose');
var{Todo} = require('./models/todo');
var{User} = require('./models/user');
var{ObjectID} = require('mongodb');
var{authenticate} = require('./middleware/authenticate');
var{bcrypt} = require('bcryptjs');
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

app.get('/todos', (req, res) => {
  Todo.find().then((todos)=>{
    res.send({
      todos
    })
  }, (e)=>{
    res.status(400).send(e);
  });

});
      //GET /todos/123123
      // app.get('/todos/:id', (req, res) => {
      //   var id = req.params.id;
      //   res.send(req.params.id)
      // })


      app.get('/todos/:id', (req, res) => {
          var id = req.params.id;
          if(!ObjectID.isValid(id))
          {
              return res.status(404).send();
          }


          Todo.findById(id).then((todo) => {
            if(!todo)
            {
              return res.send('Not found');
            }
            res.send(todo);
          }).catch((e) => {
            res.status(400).send();
          })

      });


      app.delete('/todos/:id', (req, res) => {
        var id = req.params.id;
        if(!ObjectID.isValid(id))
        {
            return res.status(404).send();
        }

        Todo.findByIdAndRemove(id).then((todo) => {
          if(!todo)
          {
            res.send('Todo not found');
          }
          res.send(todo);
        }).catch((e) => {
          res.status(400).send()

      });
      });

      // Update todos

      app.patch('/todos/:id', (req, res) => {
        var id = req.params.id;
        var body = _.pick(req.body, ['text', 'completed']);

        if(!ObjectID.isValid(id))
        {
            return res.status(404).send();
        }
        //_.isBoolean(body.completed) &&
        if(body.completed){
          body.completedAt = new Date().getTime();
        }
        else{
          body.completed = false;
          body.completedAt = null;

        }

        Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo)
        {
          return res.status(400).send();
        }

        res.send(todo);
        }).catch((e) => {
          res.status(400).send();
        })
      });

       // Sign Up user
      app.post('/user', (req, res) => {
        var body = _.pick(req.body, ['email', 'password']); // lodash :)
        var user = new User (body);

        user.save().then(() => {          // User.findByToken will be our custom model
        return  user.generateAuthToken(); // generate token for indivdual user
          //res.send(user);
        }).then((token) => {
          res.header('x-auth', token).send(user); // send token back as http response header
          //  header name is x-auth  & token
        }).catch((e) => {
          res.status(400).send(e);
        })
      });



      app.get('/users/me', authenticate, (req, res) => {

        res.send(req.user);
      });


      // login

      app.post('/users/login', (req, res) => {
        var body = _.pick(req.body, ['email', 'password']);


        User.findByCredentials(body.email, body.password).then((user) => {

          return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
          });

        }).catch((e) => {
            res.status(400).send();
        });
      });


      // Delete user

      app.delete('/users/me/token', authenticate, (req, res) => {
        req.user.removeToken(req.token).then(() => {
          res.status(200).send();
        }, () => {
          res.status(400).send();
        })
      });
app.listen(3000, () => {
  console.log('Port 3000 is up');
});


module.exports = {app};














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
