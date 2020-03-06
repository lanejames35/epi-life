"use strict";
require("dotenv").config();
const passport = require("passport");
//const GoogleStrategy = require("passport-google-oauth20");
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
    callbackURL: '/auth/github/redirect'
  }, async (accessToken, refreshToken, profile, done) => {
    const userExists = await User.findOne({ githubid: profile.id });
    if(!userExists){
      const createdUser = await new User({
        username: profile.displayName,
        githubid: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      }).save();
      console.log(`A user was created ${createdUser}`);
      return done(null, createdUser);
    }
    else{
      console.log(`Logged in as ${userExists.username}`);
      return done(null, userExists);
    }
  })
);