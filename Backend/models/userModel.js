const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  phone_number: {
    type:String,
    required: true,
    unique:true
    
  },
    
  email:{
    type: String,
    required:true,
    unique: true,
    lowercase: true
    
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;