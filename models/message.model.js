const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema(
    {
      content: {
        type: String,
        required: true
      },
      topic:{
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now()
      }
    });

module.exports = mongoose.model('messages', schema);