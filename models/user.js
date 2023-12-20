const mongoose = require('mongoose');
const roles = require('./roles')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },

  role: { type: String, enum: [roles.buyer, roles.seller], default : roles.buyer},
  email: { type: String, required: true, unique : true},
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
