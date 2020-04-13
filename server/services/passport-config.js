"use strict";
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/user");

passport.serializeUser((user, done) => {
  console.log("Serializing", user);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id , (err, user) => {
    console.log("User", user);
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
  }, async (accessToken, refreshToken, profile, done) => {
    const userExists = await User.findOne({ socialid: profile.id });
    if(!userExists){
      const createdUser = await new User({
        username: profile.displayName,
        socialid: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      }).save();
      console.log(`A user was created ${createdUser}`);
      done(null, createdUser);
    }
    else{
      console.log(`Logged in as ${userExists.username}`);
      done(null, userExists);
    }
  })
);

passport.use(
  new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/redirect'
  }, async (accessToken, refreshToken, profile, done) => {
    const userExists = await User.findOne({ socialid: profile.id });
    if(!userExists){
      const createdUser = await new User({
        username: profile.displayName,
        socialid: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      }).save();
      console.log(`A user was created ${createdUser}`);
      done(null, createdUser);
    }
    else{
      console.log(`Logged in as ${userExists.username}`);
      done(null, userExists);
    }
  })
);