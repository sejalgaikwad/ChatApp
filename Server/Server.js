
/*
const express = require('express');
const expressvalidator=require('express-validator');
const cors=require('cors')

const http = require('http');
const bodyParser=require('body-parser')
const app = express();// create express app
app.use(bodyParser.urlencoded({ extended: true }))// parse requests of content-type - application/x-www-form-urlencoded
app.use(expressvalidator());
app.use(cors())
app.use(bodyParser.json())// parse requests of content-type -application/json

var Route=require('./Routers/chatRouter')
app.use('/', Route)

const chatController = require('./Controller/chatController');
app.use(express.static('../Client'))
// Configuring the database
const dbConfig = require('../Server/DbConfig.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



var server=app.listen(3000,function()
{
  console.log('server started on port 3000');

})
const io = require('socket.io')(server);
//importing socket.io to establish a connection between client and server
io.on('connection', function (socket) {
    console.log("socket is connected ");

    socket.on('createMessage',function(message){
        chatController.message(message,(err,data) => {
            if(err)
            {
                console.log("ERROR: in message",err);
            }
            else {
                console.log(message+"in server");
                io.emit('newMessageSingle',message);
            }
        });

        socket.on('disconnect',function(){
            console.log("socket disconnected!! ");
        });
    });

});*/

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./DbConfig');
const route = require('./Routers/userRouter');
const app = express();
const cors=require('cors');
app.use(cors());
var expressValidator = require('express-validator')
app.use(expressValidator());
const chatController = require('./Controller/chatController');

app.use(bodyParser.urlencoded({ extended: true })); //basically tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false)
//or complex algorithm for deep parsing that can deal with nested objects (i.e. true).

app.use(bodyParser.json()); //basically tells the system that you want json to be used



var server=app.listen(3000, () => {
    console.log('server is running on port 3000');
});

const io = require('socket.io')(server);
//importing socket.io to establish a connection between client and server
io.on('connection', function (socket) {
    console.log("socket is connected ");

    socket.on('createMessage',function(message){
        chatController.message(message,(err,data) => {
            if(err)
            {
                console.log("ERROR: in message",err);
            }
            else {
                console.log(message+"in server");
                io.emit('newMessageSingle',message);
            }
        });

        socket.on('disconnect',function(){
            console.log("socket disconnected!! ");
        });
    });

});
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/', route);
app.use(express.static('../client'));
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
 