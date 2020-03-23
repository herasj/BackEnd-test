const jwt = require('jsonwebtoken');
require('dotenv');

module.exports = {
	create: (id) => {
		return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '45m' }); //Token expires each 45mins
	}
};
