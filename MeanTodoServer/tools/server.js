var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

var index = require('../routes/index')
var todos = require('../routes/todos')

var cors = require('cors')

var app = express();
app.set('views', path.join(__dirname,'../views'))
app.set('view engine', 'ejs')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', index)
app.use('/api/v1/', todos)

app.listen(3000,function(){
  console.log('Server started on port 3000...')
})
