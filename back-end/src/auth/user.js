'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
require('./roles.js')



const SECRET = process.env.SECRET;

const user = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  role: {type: String, default:'customer', enum: ['admin','customer']}
});

const capabilities = {
    admin: ['create','read','update','delete'],
    customer: ['read'],
  };

user.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
  return Promise.reject();
});

user.statics.decode = function (token) {
  let decoded = jwt_decode(token);
  return decoded;
};

user.statics.authenticator = function (auth) {
  let query = { username: auth.username };
  return this.findOne(query)
    .then(user => {
      return user.passwordComparator(auth.password);
    })
    .catch(console.error);
};

user.methods.passwordComparator = function (pass) {
  return bcrypt.compare(pass, this.password)
    .then(valid => {
      return valid ? this : null;
    })
    .catch(console.error);
};

user.statics.siginTokenGenerator = function (user) {
  let token = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  };
  return jwt.sign(token, SECRET);
};
user.methods.signupTokenGenerator = function (user) {
  let token = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  return jwt.sign(token, SECRET);
};

user.statics.authenticateToken = async function (token) {
  try {
    let tokenObject = jwt.verify(token, SECRET);
    if (tokenObject.username) {
      return Promise.resolve(tokenObject.username);
    } else {
      return Promise.reject();
    }
  } catch (e) {
    return Promise.reject();
  }
};

user.methods.can = function(capability) {
    return capabilities[this.role].includes(capability);
  };

module.exports = mongoose.model('user', user);