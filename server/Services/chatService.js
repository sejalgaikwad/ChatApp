const chatModel = require('../Model/chatModel');

exports.addMessage = (data, callback) => 
{
    chatModel.addMessage(data, (err, result) => 
    {
        if (err) 
        {
            console.log("ERROR: in service", err);
            callback(err)
        } 
        else 
        {
            console.log("data in service", result);
            callback(null, result)
        }
    })
}


/************************************************************************************************/


exports.getUserMsg = (data, callback) => 
{
    chatModel.getUserMsg(data, (err, result) => 
    {
        if (err) 
        {
            console.log("chat services isn't working",err);
            callback(err);
        } 
        else 
        {
            console.log("chat service works",result)
            callback(null, result);
        }
    })
}
