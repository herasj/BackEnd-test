const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const bcrypt = require('bcrypt'); 
const saltRounds = 10;

//Create new user
router.post('/', function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) { //Encrypt password
    if(err) throw err;

    const data = { //user data
      name: req.body.name,
      lastname: req.body.lastname,
      birthday: req.body.birthday,
      email: req.body.email,
      password: hash, // Encrypted password
      phone: req.body.phone
    }
    controller.create(data)//Create new user
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

module.exports = router;
