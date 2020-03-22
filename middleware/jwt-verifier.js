const jwt = require('jsonwebtoken');
require('dotenv');

const verify = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //authHeader  //Bearer(0) TOKEN(1)
    if (token == null) return res.sendStatus(401); // If there's no token return ERROR 401
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid Token
        req.user = user; //User session
        next(); // Success, move to next middleware
    });
}

module.exports= verify;