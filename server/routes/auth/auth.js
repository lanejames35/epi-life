"use strict";
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
let token = null;

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
    console.log("Request", req);
    token = jwt.sign({ user: req.user._id, expiresIn: "2h" }, process.env.TOKEN_SECRET);
    // put the token into a session store
    res.redirect("/auth/user");
});

// Handle the logout
router.get("/logout", (req, res) => {
  console.log("logging out");
  token = null;
})

// Retrive JWT for a authenticated user
router.get("/user", (req, res) => {
  res.status(200).json({ token });
})

module.exports = router;