import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId ,io} from "../Socketio/server.js";
export const sendmessage = async (req, res) => {

    try {
        const { message } = req.body;
        const recieverId = req.params.id;
        const senderId = req.user._id;
        let converstion = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        })
        const newmessage = new Message({
            sender:senderId,
            reciever:recieverId,
            message
        })
        await newmessage.save();
        const recieversocketid=getReceiverSocketId(recieverId);
        if(recieversocketid)
        {
            io.to(recieversocketid).emit("newmessage",newmessage);
        }
        if (!converstion) {
            converstion = await Conversation({
                participants: [senderId, recieverId],
                messages: [newmessage._id]
            });
           
        }
            
            else {
              converstion.messages.push(newmessage._id);
                
            }
            await converstion.save();
            return res.status(200).json({ message: "new message sent", newmessage });
        
    }
    catch (error) {
        return res.status(401).json({ message: "error in sending message", error });
        
        
    }
}
export const getmessage=async(req,res)=>{
    try{
           const chatreciever=req.params.id;
           const senderid=req.user._id;
           const conversation=await Conversation.findOne({
            participants:{
                $all:[senderid,chatreciever]
            }
           }).populate("messages");
           if(!conversation)
           {
            return res.status(201).json([]);

           }
           const message=conversation.messages;
          
           return res.status(200).json(message)
    }
    catch(error)
    {
        return res.status(401).json({ message: "error in sending message", error });

    }

}
export const deletemsg=async(req,res)=>{
    try{
    const msgid=req.params.id;
    console.log(msgid);
  
    const findmsg=await Message.findByIdAndDelete(msgid);
 
  return res.status(200).json("message deleted");
} 
catch(error)
{
  return res.status(401).json(error)
}
}