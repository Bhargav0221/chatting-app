import React, { useEffect } from 'react'
import { usecontext } from './socketcontext'
import useConversation from '../statemanage/userconversation'
import { logger } from 'sequelize/lib/utils/logger'

const usegetsocketmessage = () => {
    const{message,setmessage} =useConversation()
    const{socket}=usecontext()
 useEffect(()=>
    {
        socket.on("newmessage",(newmessage)=>{
            console.log("newmessage",newmessage);
            
            setmessage([...message,newmessage])
        
        })
 
        return () => {
            socket.off("newmessage");
            
          };
         
      
 },[socket,message,setmessage])
}

export default usegetsocketmessage
