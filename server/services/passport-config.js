"use strict";
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const GitHubStrategy = require("passport-github2");
const User = require("../models/user");

// passport.use(
//   new GoogleStrategy({
//     // Options from google
//   }, () => {

//   })
// );

passport.use(
  new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/login/github/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
  })
);