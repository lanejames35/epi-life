"use strict";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Get posts
router.get("/", async (req, res) => {
  try{
    const posts = await loadPostsCollection();
    res.send( await posts.find({}).toArray() );
  } catch(err){
    console.log(err);
  }
})
// Get post by ID
router.get("/:id", async (req, res) => {
  try{
    const posts = await loadPostsCollection();
    res.send( await posts.findOne({ 
      _id: new mongodb.ObjectID(req.params.id)
    }) );
  } catch(err){
    console.log(err);
  }
})

// Post a post
router.post("/", async (req, res) => {
  try{
    const posts = await loadPostsCollection();
    await posts.insertOne({
      title: req.body.title,
      text: req.body.text,
      createdAt: new Date()
    });
  } catch(err){
    console.log(err);
  }
  res.status(201).send();
})

// Delete posts
router.delete("/:id", async (req, res) => {
  try{
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  } catch(err){
    console.log(err);
  }
  res.status(200).send();
})

// Load posts from storage
async function loadPostsCollection(){
  try{
    const client = await mongoose.connect(
      "mongodb+srv://dbMaster:Senators123@cluster0-nkbbk.azure.mongodb.net/test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    return client.collection("posts");
  } catch(err){
    console.log(err);
  }
}

module.exports = router;