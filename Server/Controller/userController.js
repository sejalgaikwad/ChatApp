const jwt = require('jsonwebtoken');
var userService = require('../Services/userService');
const sendmail = require('../Middleware/sendmail');
const gentoken = require("../Middleware/tokanGenerate")

module.exports.register = (req, res) => 
{
    console.log("controller==>", req.body);

    req.checkBody('firstname', 'firstname is not valid').isLength({ min: 3 }).isAlpha();

    req.checkBody('lastname', 'lastname is not valid').isLength({ min: 1 }).isAlpha();

    req.checkBody('email', 'Email is not valid').isEmail();

    req.checkBody('password', 'password is not valid').isLength({ min: 8 }).equals(req.body.password);

    var errors = req.validationErrors();

    var response = {};

    if (errors) 
    {
        response.success = false;

        response.error = errors;

        return res.status(422).send(response);

    }
    else 
    {
        userService.register(req.body, (err, data) => 
        {
            if (err) 
            {
                return res.status(500).send({ message: err })
            }
            else 
            {
                return res.status(200).send({ message: data });
            }
        });
    }
}


/***********************************************************************************************/


module.exports.login = (req, res) => 
{

    console.log('request in controller', req.body);

    req.checkBody('email', 'email ID is not valid').isEmail();

    req.checkBody('password', 'password is not valid').isLength({ min: 8 });

    var secret = "qwerty";

    var errors = req.validationErrors();

    var response = {};

    if (errors) 
    {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } 
    else 
    {
        userService.login(req.body, (err, data) => 
        {
            if (err) 
            {
                return res.status(500).send({ message: err });
            }
            else 
            {
                var token = jwt.sign({ email: req.email, id: data[0]._id }, secret, { expiresIn: 86400000 });
                return res.status(200).send({  message: data, "token": token })
            }

        });
    }
}


/***********************************************************************************************/


module.exports.forgotPassword = (req, res) => 
{
    userService.forgotPassword(req.body, (err, data) => 
    {
        var responses = {};

        if (err) 
        {
            return res.status(500).send({ message: err});
        }
        else 
        {
            responses.success = true;
            responses.result = data;
            responses.message = 'Forgot link'
            console.log('data in controller ==>' + responses.message);

            const payload = 
            {
                user_id: req.body.id
            }

            const obj = gentoken.GenerateToken(payload);
            console.log(obj);

            const url = 'http://localhost:3000/resetPassword/' + obj.token;
            console.log("url in controller", url);
            console.log(req.body.email);

            sendmail.sendEmailFunction(url, req.body.email);

            res.status(200).send(url);

        }
    });
};


/***********************************************************************************************/


module.exports.resetPassword = (req, res) => 
{
    req.checkBody('password', 'password is not valid').isLength({ min: 8 });

    var errors = req.validationErrors();

    var response = {};

    if (errors) 
    {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } 
    else 
    {
        userService.resetPassword(req.body, (err, data) => 
        {
            if (err) 
            {
                console.log(err);
                return res.status(404).send({ message: err})
            }
            else 
            {
                return res.status(200).send({ message: data });
            }

        });
    }
};


/***********************************************************************************************/


module.exports.getAllUser = (req,res) => 
{
    userService.getAllUser(req, (err, data) =>
    {
        var response = {};
        if (err) 
        {
            return callback(err);
        }
        else 
        {
            response.success = true;
            response.result = data;
            res.status(200).send(response);
        }
    })
};
