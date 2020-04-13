"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const posts = require("./routes/api/posts");
const user = require("./routes/api/user");
const auth = require("./routes/auth/auth");
const logout = require("./routes/logout/logout");
const passportConfig = require("./services/passport-config");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const port = process.env.PORT || 4000;

const app = express();

// Connect to DB
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_SECRET}@cluster0-nkbbk.azure.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'vue_express'
  }
);
mongoose.connection.on('open', () => {
  console.log("Connected to the database");
});

// Middleware
app.use(bodyParser.json());
app.use(cors({
  credentials: true
}));
app.use(session({
  secret: process.env.TOKEN_SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 8 * 60 * 60 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/posts", posts);
app.use("/api/user", user);
app.use("/auth", auth);
app.use("/logout", logout);

// Turn on the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});