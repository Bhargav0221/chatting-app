import express from 'express';
import dotenv from'dotenv';
import mongoose from'mongoose';
import userroute from"./routes/user.router.js";
import cors from"cors";
import cookieParser from 'cookie-parser';
import Messageroute from'./routes/message.route.js';
import{app, server} from"./Socketio/server.js";
dotenv.config();
const port=process.env.PORT;
const URI=process.env.MONGODB_URI;


app.use(express.json());    
app.use(cors(
    {
        cors: {
            origin: "*",
        }
    }
))
app.use(cookieParser());

try{
    mongoose.connect(URI).then(
        console.log("mongo connected")
    )
.catch((err)=>console.log(err))

}
catch(error){}



app.get('/',(req,res)=>{
    res.send("hello");
})
app.use("/user",userroute);
app.use("/Message",Messageroute);
server.listen(port,()=>{
    try{
        console.log("server statrted succesfully");
    }
    catch(error)
    {
        console.log("error while starting the servor",error);
    }
})
