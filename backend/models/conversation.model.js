import mongoose from'mongoose'
 import User from './models.js'
import Message from './message.model.js'
const converstaionschema=new mongoose.Schema({
    participants:[{
        type:mongoose.Types.ObjectId,
        ref:"User" 
    }],
    messages:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Message",
            default:[]
        }
    ]
},{
    timestamps:true,
})
const Conversation=mongoose.model("Conversation",converstaionschema);
export default Conversation;