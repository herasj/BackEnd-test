const express = require('express');
const router = express.Router();
const jwt = require('../helpers/jwt');
const cat = require('../helpers/cat');
const controller = require('../controllers/user.controller');
const bcrypt = require('bcrypt');
const checkemail = require('../middleware/email'); //Email middleware
const jwtMiddleware = require('../middleware/jwt-verifier');

router.get('/', jwtMiddleware, (req, res) => {
	//This route should be a PUT/PATCH
	controller
		.updateToken(req.query.id, null)
		.then((result) => {
			//Set token db to null
			cat.fact().then((fact) => {
				//Wait cat fact
				result ? res.status(200).json({ fact }) : res.status(400).send('Unactive user');
			});
		})
		.catch((err) => console.error(err)); //res.status(400).send('Query error')
});

router.post('/', checkemail, function(req, res, next) {
	//Auth user
	controller.getPass(req.body.email).then((user) => {
		if (user == 0) {
			res.status(400).send('User doesnt exist');
		} else {
			//If user exist then decrypt the database password and compare it with the input password
			bcrypt.compare(req.body.password, user.password, function(err, result) {
				if (result == true) {
					//Same passwords
					console.dir(user._id.toString());
					const token = jwt.create(user._id.toString());
					controller.update(user._id.toString(), { token }); //Store token on db
					cat.fact().then((fact) => {
						//Wait cat fact
						res.json({ access_token: token, fact }); //Send access token
					});
				} else {
					res.status(400).send('Wrong password');
				}
			});
		}
	});
});

module.exports = router;
