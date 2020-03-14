const express = require("express");
const authCheck = require("../../services/authentication-check");
const router = express.Router();

router.get("/", authCheck, (req, res) => {
  res.send({
    user: req.user
  });
});

module.exports = router;