"use strict";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../../models/post");

// Get posts
router.get("/", async (req, res) => {
  try{
    res.send( await Post.find({}) );
  } catch(err){
    console.log(err);
  }
})
// Get post by ID
router.get("/:id", async (req, res) => {
  try{
    res.send( await Post.findById({ 
      _id: new mongoose.Types.ObjectId(req.params.id)
    }) );
  } catch(err){
    console.log(err);
  }
})

// Post a post
router.post("/", async (req, res) => {
  try{
    await new Post({
      title: req.body.title,
      tags: req.body.tags,
      author: new mongoose.Types.ObjectId(req.body.author),
      created: new Date(),
      body: req.body.body
    });
  } catch(err){
    console.log(err);
  }
  res.status(201).send();
})

// Delete posts
router.delete("/:id", async (req, res) => {
  try{
    await Post.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
  } catch(err){
    console.log(err);
  }
  res.status(200).send();
})

module.exports = router;