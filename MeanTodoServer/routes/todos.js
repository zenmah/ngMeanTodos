var express = require('express')
var router = express.Router();
var mongojs = require('mongojs')
var db = mongojs('mongodb://jvl:password@ds052629.mlab.com:52629/meantodo_db', ['todos'])


router.get('/todos', function (req, res, next) {
  db.todos.find(function (err, todos) {
    if (err) {
      res.send(err)
    }
    else {
      res.json(todos)
    }
  })
})

router.get('/todos/:id', function (req, res, next) {
  db.todos.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, todo) {
    if (err) {
      res.send(err)
    }
    else {
      res.json(todo)
    }
  })
})

router.post('/todos', function(req,res,next){
  var todo = req.body;


  if (!todo.text || !(todo.is_completed + '')) {
    res.status(400);
    res.json({
      "error":"Invalid Data"
    })
  }
  else {
    db.todos.save(todo, function(err,result){
      if (err) {
        res.send(err)
      }
      else {
        res.json(result)
      }
    })
  }
})

router.put('/todos/:id', function(req,res,next){
  var todo = req.body;
  var updatedTodo = {};

  if (todo.is_completed)
  {
    updatedTodo.is_completed = todo.is_completed;
  }
  if (todo.text)
  {
    updatedTodo.text = todo.text;
  }

  if (!updatedTodo){
    res.status(400);
    res.json({
      "error":"Invalid Data"
    })
  }
  db.todos.update(
    { _id: mongojs.ObjectId(req.params.id) }
    , updatedTodo
    , function(err,result){
      if (err) {
        res.send(err)
      }
      else {
        res.json(result)
      }
    })
})

router.delete('/todos/:id', function(req,res,next){
  var todo = req.body;
  db.todos.remove(
    { _id: mongojs.ObjectId(req.params.id) }
    , ''
    , function(err,result){
      if (err) {
        res.send(err)
      }
      else {
        res.json(result)
      }
    })
})


module.exports = router;