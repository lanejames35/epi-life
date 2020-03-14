"use strict";
const authCheck = (req, res, next) => {
  if(!req.headers.cookie){
    res.status(403).send("This request requires authentication");
  }
  else {
    next();
  }
}

module.exports = authCheck;
