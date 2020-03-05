"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const posts = require("./routes/api/posts");
const login = require("./routes/login/login");
const passportConfig = require("./services/passport-config");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;

const app = express();

// Connect to DB
mongoose.connect(
  "mongodb+srv://dbMaster:Senators123@cluster0-nkbbk.azure.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on('open', () =>{
  console.log("Connected to the database");
});

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/api/posts", posts);
app.use("/login", login);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});