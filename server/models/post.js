"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  tags: String,
  author: String,
  created: Date,
  body: String,
  banner: String
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;