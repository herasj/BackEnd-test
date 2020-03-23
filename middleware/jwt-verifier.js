const jwt = require('jsonwebtoken');
const controller = require('../controllers/user.controller');
require('dotenv');

const verify = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; //authHeader  //Bearer(0) TOKEN(1)
	if (token == null) return res.sendStatus(401); // If there's no token return ERROR 401
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403); // Invalid Token
		controller
			.research(user.id)
			.then((result) => {
				console.dir(user.id);
				if (!result.token) res.sendStatus(403);
				if (token == result.token) {
					//If token if the same stored in db
					req.user = user.id; //User session
					next(); // Success, move to next middleware
				} else {
					res.sendStatus(403);
				}
			})
			.catch((err) => console.error(err));
	});
};

module.exports = verify;
