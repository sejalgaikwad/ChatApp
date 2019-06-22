
const mongoose =require('mongoose')
const chatSchema = new mongoose.Schema({
    reciever:String,
    sender:String,
    message:String

}, {
    timestamps: true
});

const chat = mongoose.model('chat', chatSchema);
class chat_model
{
   
    addMessage(data,callback){
            const chatdata=new chat(data);
            chatdata.save((err,result)=>{
                if(err){
                    console.log(err);
                    callback(err);
                }
                else{
                    console.log("message saved successfully......");
                    return callback(null,result)
                }
            })
        }
        getUserMsg(data,callback)
        {
            chat.find({
                $or:[
                     {$and:[
                          {"reciever":data.reciever}, 
                          {"sender":data.sender}
                     ]},
                     {$and:[
                        {"reciever":data.sender}, 
                        {"sender":data.reciever}
                   ]}
                     
                 ]},(err,result)=>{
                if(err){
                    console.log(err);
                    callback(err);
                }
                else{
                    console.log("messages get successfully......");
                    return callback(null,result)
                }
            })
        }

        

}
module.exports=new chat_model();