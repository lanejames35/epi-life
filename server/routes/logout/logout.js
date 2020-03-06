"use strict";
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.logout();
  res.send("Bye Bye!");
})

module.exports = router;