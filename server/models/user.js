"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userID: String,
  socialid: String,
  username: String,
  email: String,
  avatar: String
});

const User = mongoose.model('users', userSchema);

module.exports = User;