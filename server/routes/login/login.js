"use strict";
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Auth with GitHub
router.get("/github", passport.authenticate("github", {
  scope: ['user:email'],
}));

// GitHub Callback
router.get(
  "/github/redirect",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    // Respond with JWT
    const token = jwt.sign({ user: req._id }, process.env.TOKEN_SECRET);
    // put the token into a session store
    res.redirect('/');
});

module.exports = router;