'use strict';
var mysql = require('mysql');

var con = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database : 'login',
  });

con.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected Pooling!");
});

module.exports = con;