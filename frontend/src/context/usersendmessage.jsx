import React, { useState } from "react";
import  useConversation from"../statemanage/userconversation.jsx";
import axios from "axios";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { message, setmessage, selectedconversation } = useConversation();
  const sendmessage = async (nemessage) => {
    setLoading(true);
    try {
        const token=localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.VITE_API_URL}/Message/send/${selectedconversation._id}`,
        
            {
               message: nemessage
            },
            {
            headers:{
                Authorization:  `Bearer ${token}`
            },
        }
         
      );
      setmessage([...message, res.data.newmessage]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendmessage };
};

export default useSendMessage;
