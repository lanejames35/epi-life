"use strict";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../../models/post");
const formidable = require("formidable");

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
router.post("/", (req, res, next) => {
  const form = formidable();

  form.parse(req, (err, fields, files) => {
    if(err){
      next(err);
      return;
    }
    else{
      const post = new Post({
        title: fields.title,
        tags: fields.tags,
        author: {
          name: req.user.username,
          avatar: req.user.avatar
        },
        // author: new mongoose.Types.ObjectId(fields.author),
        created: new Date(),
        body: fields.markdown,
        banner: files.bannerImage.path
      });
      post.save((err) =>{
        if(err){
          res.status(500).send({
            Error: "A server error occurred",
            Message: err
          })
        }
      });
      res.status(201).send();
    }
  });
})

// Delete posts
router.delete("/:id", (req, res) => {
  Post.deleteOne({ 
    _id: new mongoose.Types.ObjectId(req.params.id)
  }, (err) => {
    if(err){
      res.status(400).send({
        Error: err
      });  
    }
  });
  res.status(200).send();
})

module.exports = router;