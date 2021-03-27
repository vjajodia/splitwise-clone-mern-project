var express = require('express');
var router = express.Router();
const queries = require('../dbqueries/queries');
const encrypt = require('../encrypt');
const path = require('path');

router.post('/create',function(req,res){
    console.log("Inside User signup Post Request");
    console.log("Req Body : ",req.body);
    const group = req.body;
    queries.createGroup(user,hash, result => {
            console.log("Number of records inserted: " + result.affectedRows);
            res.status(200).send({success: true, message:'User created'});
            console.log("Response Status", res.statusCode);
        }, err => {
            if(err.code === 'ER_DUP_ENTRY'){
                res.status(401).send({ success: false, message: 'Email already exists. Please sign up with a different email id' });
                console.log("Response Status", res.statusCode);
            }else{
                res.status(500).send({ success: false, message: `Something failed when inserting record. ${err.message}`});
            }
        });
    }, err => {
        res.status(500).send({ success: false, error: 'Something failed when gnerating hash' });
    });

router.post('/signin',function(req,res){
    console.log("Inside Buyer Login Post Request");
    console.log("Req Body : ",req.body);

    const email = req.body.email;
    const password = req.body.password;

    queries.getUserPasswordByEmail(email, row => {
        if(row){
            encrypt.confirmPassword(password,row.password, result => {
                if (result){
                    res.cookie('cookie',{id: row.id},{maxAge: 3600000, httpOnly: false, path : '/'});
                    req.session.user = email;
                    res.status(200).json({success: true, message: "User Login successful", id: row.id, firstName: row.fname});
                    console.log("Response Status", res.statusCode);
                }else{
                    res.status(401).json({success: false, message: "Incorrect Password"});
                    console.log("Response Status", res.statusCode);
                }
            }, err => {
                res.status(500).json({success: false, message: "Something wrong with bcrypt"});
            });
        }else{
            res.status(401).json({success: false, message: "Email does not exists. Please try again"});
            console.log("Response Status", res.statusCode);
        }
    }, err => {
        res.status(500).json({success: false, message: "Something wrong when reading the record"});
    });
});

module.exports = router;