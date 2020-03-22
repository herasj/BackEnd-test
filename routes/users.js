const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const bcrypt = require('bcrypt'); 
const saltRounds = 10;
const jwt = require('express-jwt'); //Jwt verifier
const validator = require('validator');
const checkemail = require('../middleware/email'); //Email middleware
require('dotenv');

//Create new user
router.post('/',checkemail,function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) { //Encrypt password
    if(err) throw err;

      //Expected Json
      // name: req.body.name,
      // lastname: req.body.lastname,
      // birthday: req.body.birthday,
      // email: req.body.email,
      // password: hash, // Encrypted password
      // phone: req.body.phone
 
    controller.create(req.body)//Create new user
    .then((status) => {
      if(status==1){
        res.sendStatus(201) //User created
      }
      else{
        res.status(400).send('Email already in use');
      }
    }
    ) 
   
  });
});

//Update user info
// router.put('/:id',jwt({secret: process.env.ACCESS_TOKEN_SECRET}),(req,res) => {
  
// }
// )

module.exports = router;
