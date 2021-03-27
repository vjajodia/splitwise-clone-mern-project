'use strict';
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : 'login',
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected no pooling!");
});

module.exports = con;