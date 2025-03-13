import React, { useEffect } from 'react'
import { usecontext } from './socketcontext'
import useConversation from '../statemanage/userconversation'
import Usegetmessage from './Usegetmessage';
function usedeletesocket() {
    const{message} =Usegetmessage()
    const{setmessage}=useConversation();
    const{socket}=usecontext();
    useEffect(()=>{
        if(!socket) return;
        const inlineHandler = (msgId) => {
            console.log("messages at reciever",message);
            
          const updatedMessages = message.filter((msg) => msg._id !== msgId);
          console.log("deleted message to reciever side",updatedMessages);
          
          setmessage([...updatedMessages])
          
          };

        socket.on("delete-message",inlineHandler);
   

 


  return () => {
    socket.off("delete-message",inlineHandler);
   
  };
    },[socket,setmessage])
  
}

export default usedeletesocket;
