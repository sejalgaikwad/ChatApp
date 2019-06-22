var express = require('express');

var router = express.Router();
var users = require('../Controller/userController');
var chatController = require("../Controller/chatController");
var auth = require('../Middleware/authentication');

try{
    router.get('/getAllUser',auth,users.getAllUser);
    router.get('/getUserMsg',auth,chatController.getUserMsg);
    
}
catch(err)
{
    console.log("ERROR : in authorization");
}

module.exports =router