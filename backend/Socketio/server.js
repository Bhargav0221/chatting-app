    import { Server } from "socket.io";
    import * as http from "http";
    import express from "express";
import { log } from "console";
  
    const app = express();
    const server = http.createServer(app);

    app.use(cors({
    origin: "https://chatting-app-topaz.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));
    const users={};
    export const getReceiverSocketId = (receiverId) => {
        return users[receiverId];
      };
    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);
        const userId=socket.handshake.query.userId;
        console.log("useris",userId);
        if(userId)
        {
            users[userId]=socket.id;
        }
        console.log(users);
        io.emit("getonline",Object.keys(users))
      socket.on("deletemessage",({msgId,conversationId})=>{
      console.log("conversation",conversationId);
       const socketid=getReceiverSocketId(conversationId)
      console.log("socket is",socketid);
      
        io.to(socketid).emit("delete-message",msgId);

      })
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
            delete users[userId];
           
            io.emit("getonline",Object.keys(users))
        });
    });

    export { app, io, server };
