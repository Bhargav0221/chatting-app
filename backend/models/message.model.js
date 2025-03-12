import mongoose from "mongoose";
import User from "./models.js"

const messageschema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
      type:String,
      required:true,
      trim:true,
      validate:[
        {
        validator:(value)=>{
            value.length>0
            message:"message cannot be empty "
        }
    }
      ]   

    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

},{
    timestamps:true
})
const Message=mongoose.model('Message',messageschema);
export default Message;