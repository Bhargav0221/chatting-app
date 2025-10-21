    import express from 'express';
    import dotenv from'dotenv';
    import mongoose from'mongoose';
    import userroute from"./routes/user.router.js";
    import cors from"cors";
    import cookieParser from 'cookie-parser';
    import Messageroute from'./routes/message.route.js';
    import{app, server} from"./Socketio/server.js";
    import  Otproute from "./routes/otp.route.js"
    dotenv.config();
    const port=process.env.PORT||3000;
    const URI=process.env.MONGODB_URI;


    app.use(express.json());    
    app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chatting-app-topaz.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

    app.use(cookieParser());

 
        mongoose.connect(URI).then(()=>
            console.log("mongo connected")
        )
    .catch((err)=>console.log(err))

    
    



    app.get('/',(req,res)=>{
        res.send("hello");
    })
    app.use("/user",userroute);
    app.use("/Message",Messageroute);
    app.use("/otp",Otproute);
    server.listen(port,()=>{
        try{
            console.log("server statrted succesfully");
        }
        catch(error)
        {
            console.log("error while starting the servor",error);
        }
    })
