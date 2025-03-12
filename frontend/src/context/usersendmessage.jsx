import { useState } from "react";
import useConversation from "../statemanage/userconversation.jsx";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { message, setmessage, selectedconversation } = useConversation();

  const sendmessage = async (newMessage) => {
    if (!selectedconversation?._id) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/Message/send/${selectedconversation._id}`,
        { message: newMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     
      setmessage((prev) => [...(Array.isArray(prev) ? prev : []), res.data.newmessage]);

    } catch (error) {
      console.error("Error in send messages:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendmessage };
};

export default useSendMessage;
