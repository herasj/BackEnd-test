const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema(
    {
      name: {
        type: String,
        required: true
      },
      lastname: {
        type: String
      },
      birthday: {
        type: Date,
        required: true
      },
      active:{
        type: Boolean,
        default: true
      },
      visible:{
        type: Boolean,
        default: true
      },
      email:{
        type: String,
        trim: true,
        required: true
      },
      password:{
        type: String,
        trim: true,
        require: true
      },
      phone:{
        type: String,
        trim: true,
        required: true
      },
      img:{
        type: String,
        default: null
      },
      token:{
        type: String,
        default: null
      }
    });

module.exports = mongoose.model('users', schema);