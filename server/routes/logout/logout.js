"use strict";
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.logout();
  res.redirect("http://localhost:8080");
});

module.exports = router;