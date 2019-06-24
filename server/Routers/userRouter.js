var express= require('express')
var router=express.Router()

var controller=require('../Controller/userController')

var chatController=require('../Controller/chatController')

var authroute = require('../Middleware/authentication');



router.post('/register',controller.register)

router.post('/login',controller.login)

router.post('/forgotPassword',controller.forgotPassword);

router.post('/resetPassword',controller.resetPassword);

router.post('/getAllUser',controller.getAllUser);

router.post('/addMessage',chatController.addMessage)

router.post('/getUserMsg',chatController.getUserMsg);

router.use('/auth',authroute);

module.exports = router



