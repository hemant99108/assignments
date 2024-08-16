const request = require('supertest');
const assert = require('assert');
const express = require('express');
const { NOTFOUND } = require('dns');
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)


//so the numberOfRequest object is being cleared after each second 

app.use(function(req,res,next){

  const userId=req.headers["user-id"];

  if(numberOfRequestsForUser[userId]){
    numberOfRequestsForUser[userId]+=1;

    //rate the limit here to only 5 calls else return 404 as response 
    if(numberOfRequestsForUser[userId]>5){
      res.status(404).send("no-entry");
    }
    else{
      next();
    }
  }
  //just initialise the object for the userid to store the no of request of the same userid 
  else{
    numberOfRequestsForUser[userId]=1;
    next();//this will be the first call then next called then user will again make the request will increase it c
    //count within the same second 
  }


})





app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

module.exports = app;