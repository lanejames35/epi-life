"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const posts = require("./routes/api/posts");
const github = require("./routes/api/github");

const port = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/api/posts", posts);
app.use("/user/login/callback", github);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});