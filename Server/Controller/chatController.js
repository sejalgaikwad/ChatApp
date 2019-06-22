const chatServices = require("../Services/chatService")



try {
    module.exports.addMessage = (req, res) => {
        chatServices.addMessage(req.body, (err, result) => {
            var response = {};
            if (err) {
                response.err = false;
                response.status = err;
                res.status(500).send(response)
            } else {
                response.err = true;
                response.status = result;
                res.status(200).send(response)
            }
        })
    }
}
catch (err) {
    console.log("ERROR : in chat controll",err);

}

/********************************************************************************************** */


try {
    module.exports.getUserMsg = (req, res) => {
        chatServices.getUserMsg(req.body, (err, result) => {
            var response = {};
            if (err) {
                response.err = false;
                response.status = err;
                res.status(500).send(response)
            } else {
                response.err = true;
                response.status = result;
                res.status(200).send(response)
            }
        })
    }
}
catch (err) {
    console.log("ERROR : in chat controll",err);

}
