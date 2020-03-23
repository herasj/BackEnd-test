const validator = require('validator');
const email = (req, res, next) => {
	if (validator.isEmail(req.body.email) == false) {
		//Check if email is valid
		res.status(400).send('Invalid email');
	} else {
		next();
	}
};
module.exports = email;
