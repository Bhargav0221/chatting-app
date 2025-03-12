import React, { useEffect } from 'react'
import { usecontext } from './socketcontext'
import useConversation from '../statemanage/userconversation'
import Usegetmessage from './Usegetmessage';
function usedeletesocket() {
    const{message,setmessage} =useConversation()
    const{socket}=usecontext();
    useEffect(()=>{
        if(!socket) return;
        const inlineHandler = (msgId) => {
          setmessage((prevMessages) =>
            Array.isArray(prevMessages)
              ? prevMessages.filter((msg) => msg._id !== msgId)
              : []
          );
          
          };

        socket.on("delete-message",inlineHandler);
   

 


  return () => {
    socket.off("delete-message",inlineHandler);
   
  };
    },[socket,setmessage])
  
}

export default usedeletesocket;
