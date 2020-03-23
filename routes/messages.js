const express = require('express');
const router = express.Router();
const controller = require('../controllers/message.controller');
const mqtt = require('mqtt');
const cat = require('../helpers/cat');
const client  = mqtt.connect('mqtt://mosquitto-prueba.u-wigo.com');
const topic = 'device';
const jwtMiddleware = require('../middleware/jwt-verifier');

client.on("connect",function(){	//Wait for connection
  console.log('Connected to broker');
  client.subscribe(topic); //Subscribe to topic
  client.on('message', function (topic, message) { //Listen messages
    // Show messages
    console.log(message.toString());
    // client.end();
  })
})

//Send a message
router.post('/send',jwtMiddleware, (req, res)=> {
  if (client.connected==true){
    client.publish(topic, req.body.msg); //Publish message to topic 
    controller.create({content: req.body.msg, topic, author: req.user});//Store message
    cat.fact().then((fact) => { //Wait cat fact
      res.status(200).json({fact});
    })
  }
  else{
    console.error('Client is not connected');
  }
  
});

router.get('/',jwtMiddleware,(req,res) => {
  controller.research().then((messages) => {
    cat.fact().then((fact) => { //Wait cat fact
      res.status(200).json({messages,fact}); //Query not implemented yet
    })
  })
})
module.exports = router;
