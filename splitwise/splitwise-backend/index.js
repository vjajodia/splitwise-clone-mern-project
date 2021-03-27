
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
const mysql = require('mysql');
const { database } = require('./config/keys');
const {check, validationResult } = require('express-validator');


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


app.use(session({
    secret              : 'cmpe273_splitwise_project',
    resave              : false,
    saveUninitialized   : false,
    duration            : 60 * 60 * 1000,    
    activeDuration      :  5 * 60 * 1000
}));


var user = require('./routes/user');
var group = require('./routes/group');



app.use(bodyParser.json());


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  app.use('/user', user);
  app.use('/group', group);
  

app.listen(3001);
console.log("Server Listening on port 3001");