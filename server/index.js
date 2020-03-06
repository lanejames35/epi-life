"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const posts = require("./routes/api/posts");
const auth = require("./routes/auth/auth");
const passportConfig = require("./services/passport-config");
const mongoose = require("mongoose");
const passport = require("passport");
const port = process.env.PORT || 4000;

const app = express();

// Connect to DB
mongoose.connect(
  "mongodb+srv://dbMaster:Senators123@cluster0-nkbbk.azure.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'vue_express'
  }
);
mongoose.connection.on('open', () =>{
  console.log("Connected to the database");
});

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/api/posts", posts);
app.use("/auth", auth);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});