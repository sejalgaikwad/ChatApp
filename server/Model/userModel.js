const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
// create instance of Schema 
var mongoSchema = mongoose.Schema;
var userSchema = new mongoSchema({
    "firstname":
    {
        type: String,
        required: [true, "First name is mandatory"]
    },
    "lastname":
    {
        type: String,
        required: [true, "LastName is mandatory"]
    },
    "email":
    {
        type: String,
        required: [true, "Email is mandatory"]
    },
    "password":
    {
        type: String, required:
            [true, "password is mandatory"]
    },

}, {
        timestamps: true
    });

/******************************************************************************************/

function usermodel() {}

var user = mongoose.model('user', userSchema);
function hash(password) 
{
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}


/******************************************************************************************/


usermodel.prototype.register = (body, callback) => 
{

    user.find({ 'email': body.email }, (err, data) => 
    {
        if (err) 
        {
            console.log("ERROR: in register user schema ");
            return callback(err);
        } 
        else if (data.length > 0) 
        {
            response = { "error": true, "message": "Email already exists ", "errorCode": 404 };
            return callback(response);
        }
        else 
        {
            const newUser = new user
            ({
                "firstname": body.firstname,
                "lastname": body.lastname,
                "email": body.email,
                "password": hash(body.password)
            });
            newUser.save((err, data) => 
            {
                if (err) 
                {
                    return callback(err);
                } 
                else 
                {
                    callback(null, data);
                }
            })
        }
    });
}


/******************************************************************************************/


usermodel.prototype.login = (body, callback) => 
{
    user.find({ 'email': body.email }, (err, data) => 
    {
        if (err) 
        {
            return callback(err);
        }
        else if (data.length > 0) 
        {
            bcrypt.compare(body.password, data[0].password, (err, res) => {
                if (err) 
                {
                    return callback(err);
                }
                else if (res) 
                {
                    console.log("login succesfully ");
                    return callback(null, data);
                }
                else 
                {
                    console.log("Password incorrect");
                    return callback("Password incorrect").status(500);
                }
            });
        } 
        else 
        {
            console.log(body.username);
            console.log(body.password);
            console.log("username is not found in the database , try again ");
            return callback("Invalid User");
        }
    });
}


/******************************************************************************************/


usermodel.prototype.forgotPassword = (body, callback) => 
{
    user.find({ 'email': body.email }, (err, data) => 
    {
        if (err) 
        {
            return callback(err);
        }
        else if (data) 
        {
            console.log("data in usermodel", data);
            return callback(null, user);
        }
        else 
        {
            return callback('INVALID USER !!! ');
        }
    });
}


/******************************************************************************************/


usermodel.prototype.resetPassword = (body, callback) => 
{
    user.find({ 'email': body.email }, (err, data) => 
    {
        if (err) 
        {
            console.log("Error in register user schema ");
            return callback(err);
        } 
        else if (data.length > 0) 
        {
            response = { "error": true, "message": "Email already exists ", "errorCode": 404 };
            return callback(response);
        }
        else 
        {
            const newUser = new user
            ({
                'firstname': body.firstname,
                'lastname': body.lastname,
                'email': body.email,
                'password': hash(body.password)
            });
            newUser.save((err, result) =>
            {
                if (err)
                {
                    console.log("error in model file", err);
                    return callback(err);
                } 
                else
                {
                    console.log("data save successfully", result);
                    return callback(null, result);
                }
            })
        }
    });
}


/******************************************************************************************/


usermodel.prototype.getAllUser = (req, callback) => 
{
    user.find({}, (err, data) => 
    {
        if (err) 
        {
            callback("ERROR: in usermodel " + err)
        } 
        else 
        {
            callback(null, data);
        }
    })
}

module.exports = new usermodel();