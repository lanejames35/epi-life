"use strict";
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Auth with GitHub
router.get("/github", passport.authenticate("github", {
  scope: ['user:email']
}));

// GitHub Callback
router.get(
  "/github/redirect",
  passport.authenticate("github"),
  (req, res) => {
    console.log("Logged in with GitHub");
});

module.exports = router;