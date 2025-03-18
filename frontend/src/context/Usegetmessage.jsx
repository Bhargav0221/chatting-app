import React, { useDeferredValue, useEffect } from 'react'
import { useState } from 'react'
import useConversation from '../statemanage/userconversation';
import axios from'axios';
function Usegetmessage() {
    console.log("usemessage");
    
    const[loading,setloading]=useState(false);
    const{message,setmessage,selectedconversation}=useConversation();
    useEffect(()=>{
      

        const getmessage=async()=>{
            console.log("messagesss");
            setloading(true)
            if(selectedconversation)
            {
            try{
                const token=localStorage.getItem("token");
            const response=await axios.get(`${import.meta.env.VITE_API_URL}/Message/get/${selectedconversation._id}`,{
                headers: {
                    Authorization: `Bearer ${token}`, // 🔥 Add token here
                },
            });
            console.log("✅ API Response:", response.data);
            
            setmessage(response.data);
            
            setloading(false)
        }
        catch(error)
        {
            console.log(error);
            
        }
    }
    else{
        console.log("select a person please");
    }
}
getmessage()
    },[selectedconversation])
  return {message,loading };
}

export default Usegetmessage;
