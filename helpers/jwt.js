const jwt = require('jsonwebtoken');
require('dotenv');

module.exports={
    create: (email) => {
        return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
    }
}