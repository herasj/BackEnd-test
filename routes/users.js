require('dotenv');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const bcrypt = require('bcrypt'); 
const saltRounds = 10;
const jwt = require('../middleware/jwt-verifier'); //Jwt verifier
const checkemail = require('../middleware/email'); //Email middleware

//Create new user
router.post('/',checkemail,function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) { //Encrypt password
    if(err) throw err;
      //Expected Json
      const data ={
      name: req.body.name,
      lastname: req.body.lastname,
      birthday: req.body.birthday,
      email: req.body.email,
      password: hash, // Encrypted password
      phone: req.body.phone
      }
    controller.create(data)//Create new user
    .then((status) => {
      (status) ? res.sendStatus(201) : res.status(400).send('Email already in use');
    })
    .catch(err => console.error(err));
  });
});

//Update user info
router.put('/:id',jwt,(req,res) => {
  console.log(`${process.env.ACCESS_TOKEN_SECRET}`);
  controller.update(req.params.id,req.body).then((result) => {
    (result) ? res.sendStatus(200) : res.status(400).send('Unactive user');
  }
  )//Ok 
  .catch(err => console.error(err));
})

//Delete user info
router.delete('/:id',jwt,(req,res) => {
  controller.delete(id).then((result) => {
    (result) ? res.sendStatus(200) : res.status(400).send('User not found');
  }
  )
}
)
module.exports = router;
