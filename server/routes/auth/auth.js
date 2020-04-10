"use strict";
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Auth with GitHub
router.get("/github", passport.authenticate("github", {
  scope: ['user:email'],
}));
// Auth with Google
router.get("/google", passport.authenticate("google", {
  scope: ['profile', 'email']
}));

// GitHub Callback
router.get(
  "/github/redirect",
  passport.authenticate("github"),
  (req, res) => {
    res.redirect("http://localhost:8080");
  }
);
// Google callback
router.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("http://localhost:8080");
  }
);

module.exports = router;