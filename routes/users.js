require('dotenv');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const image = require('../controllers/image.controller');
const bcrypt = require('bcrypt'); 
const saltRounds = 10;
const jwt = require('../middleware/jwt-verifier'); //Jwt verifier middleware
const checkemail = require('../middleware/email'); //Email validator middleware
const jwtverifier = require('../helpers/jwt');
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

//Get user info
router.get('/:id',jwt,(req,res) => {
  let id;
  if(req.params.id == 'me'){
    id = req.user;
  }
  else{
    id=req.params.id;
  }
  controller.research(id).then((result) => {
    if(!result){
      res.status(400).send('User not found');
    }
    else{
      res.json(result);
    }
  }
  )
}
)

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
  controller.delete(req.params.id).then((result) => {
    (result) ? res.sendStatus(200) : res.status(400).send('User not found');
  }
  )
})

//Upload Img
router.patch('/:id/set/image',(req,res) => {
  console.dir(req.files);
  console.dir(req.file);
  // const file = req.files.img;
  // file.mv('./image/hello.jpg',(err) => {
  //   if(err) throw err;
  // }
  // )
  res.send('File uploaded');
})

router.patch('/:id/set/status/active/:active',jwt,(req,res) => {
  controller.setActive(req.params.id,req.params.active).then((result) => {
    (result) ? res.sendStatus(200) : res.status(400).send('User not found');
  }
  )
}
)

router.patch('/:id/set/status/visible/:visible',jwt,(req,res) => {
  controller.setVisible(req.params.id,req.params.visible).then((result) => {
    (result) ? res.sendStatus(200) : res.status(400).send('User not found');
  }
  )
}
)

module.exports = router;

