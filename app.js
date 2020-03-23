const app = require('./config/express');
const path = require('path');
const db = require('./config/mongo');
// const bb = require('express-busboy');
require('dotenv');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

db.then(
    () => {
      console.log('Connected to MongoDB')
      app.listen(process.env.API_PORT, () => console.log(`Running API on port ${process.env.API_PORT}`))
    },
    error => console.warn(error)
  )
  .catch(err => console.log(err));
  

module.exports = app;
