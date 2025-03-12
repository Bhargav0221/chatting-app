    import { Server } from "socket.io";
    import * as http from "http";
    import express from "express";
import { log } from "console";
  
    const app = express();
    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
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
      socket.on("deltemessage",({msgId,conversationId})=>{
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
