import React, { useState } from "react";
import useConversation from "../statemanage/userconversation.jsx";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { message, setmessage, selectedconversation } = useConversation();

  const sendmessage = async (nemessage) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/Message/send/${selectedconversation._id}`,
        {
          message: nemessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Only update if message array is not empty
      if (message.length > 0) {
        setmessage([...message, res.data.newmessage]);
      }
      else {
        setmessage(res.data.newmessage)
      }
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };

  return { loading, sendmessage };
};

export default useSendMessage;
