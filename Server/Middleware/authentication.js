
var jwt = require('jsonwebtoken');
var secret = "qwerty";
try{
var auth = function (req, res, next) {
    console.log("In auth");
    var token = req.headers["token"];
    console.log(token ,"token in authentication");
    var response = {
        'message': "Unauthorised user"
    };
       jwt.verify(token, secret, function (err, data) {
        if (err) {
            console.log(err)
            return res.status(401).send(response);
        }
        else {
            console.log(data);
            next();
        }
    });
}}
catch(err)
{
    console.log("ERROR: Couldn't generate token")
}
module.exports = auth;
