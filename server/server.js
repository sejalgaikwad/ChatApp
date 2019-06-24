

//const http = require('http');
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


app.use(bodyParser.urlencoded({ extended: true })); //basically tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false)
//or complex algorithm for deep parsing that can deal with nested objects (i.e. true).

app.use(bodyParser.json()); //basically tells the system that you want json to be used
app.use(express.static('../client'));


app.listen(3000, () => {
    console.log('server is running on port 3000');
});

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/', route);

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
 