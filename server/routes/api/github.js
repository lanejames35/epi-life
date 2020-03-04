"use strict";
const express = require("express");
const router = express.Router();
const https = require("https");
const querystring = require("querystring");
const StringDecoder = require("string_decoder").StringDecoder;

router.get("/", (req, res) => {
  const code = req.query.code;
  const state = req.query.state;
  const data = {
    client_id: "4a8a55bb3317c21bf47b",
    client_secret: "2ab520c5969463705a9f3281f254531a376ef61a",
    code: code,
    state: state
  };
  const post_data = querystring.stringify(data);
  const options = {
    hostname: 'github.com',
    port: 443,
    path: '/login/oauth/access_token',
    method: 'POST',
    headers: { 'Accept': 'application/json' }
  };
  if(!code){
    return res.status(400).send({
      error: true,
      message: "Did not receive a code."
    });
  }
  // Post the code and get a token
  https.request(options, response => {
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    response.on('data', chunk => {
      buffer += decoder.write(chunk);
    })
    .on('end', () => {
      buffer += decoder.end();
      const accessToken = JSON.parse(buffer).access_token;
      // Get user information using the access token
      const options = {
        headers: {
          'Authorization': `token ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'vue-express-app'
        }
      };
      https.get(
        'https://api.github.com/user',
        options,
        response => {
          const decoder = new StringDecoder('utf-8');
          let buffer = '';
          response.on('data', chunk => {
            buffer += decoder.write(chunk);
          })
          .on('end', () => {
            buffer += decoder.end();
            res.status(200).send(JSON.parse(buffer));
          })
          .on('error', (err) => {
            return err;
          });  
        }
      )
      .on('error', err => {
        console.log('Request for user information failed!');
        console.log(`Error code: ${err.code}`);
        console.log(`Message: ${err.message}`);
      });
    })
    .on('error', (err) => {
      res.status(400).send(`There was a problem getting the access token ${err}`);
    });
  })
  .on('error', err => {
    console.log(`Error code: ${err.code}`);
    console.log(`Message: ${err.message}`);
  })
  .end(post_data);
});


module.exports = router;