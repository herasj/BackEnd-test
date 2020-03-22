const express = require('express');
const router = express.Router();
const jwt = require('../helpers/jwt');
const controller = require('../controllers/user.controller');
const bcrypt = require('bcrypt'); 
const checkemail = require('../middleware/email'); //Email middleware

router.post('/',checkemail, function(req, res, next) {
  controller.research(req.body.email).then((user) => {
    if(user==0){
      res.status(400).send('User doesnt exist');
    }
    else{ //If user exist then decrypt the database password and compare it with the input password
      bcrypt.compare(req.body.password, user, function(err, result) {
       console.dir(user);
        if(result == true){//Same passwords
          const token = jwt.create(req.body.email);
          controller.token({email: req.body.email,token}) //Store token on db
          res.json({access_token: token}) //Send access token
       } 
       else{
         res.status(400).send('Wrong password');
       }
    });
    }
  }
  )
});

module.exports = router;
