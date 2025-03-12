import React, { useState } from 'react';
import Mess from './mess';
import Usegetmessage from '../../context/Usegetmessage';
import Loading from '../loading';
import axios from 'axios';
import usegetsocketmessage from '../../context/usegetsocketmessage';
import { usecontext } from '../../context/socketcontext';
import useConversation from '../../statemanage/userconversation';
import usedeletesocket from '../../context/usedeletesocket';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Message() {
  const { message, loading, setmessage } = Usegetmessage();
  usegetsocketmessage();
  usedeletesocket();
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const { socket } = usecontext();
  const { selectedconversation } = useConversation();

  if (loading) {
    return <Loading />;
  }

  const handleDelete = async (msgId) => {
    if (!msgId) return;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/Message/delete/${msgId}`);

      if (response.status === 200) {
        const updatedMessages = message.filter((msg) => msg._id !== msgId);
        setmessage(updatedMessages);
        socket.emit("deltemessage", { msgId, conversationId: selectedconversation._id });
        toast.success("Message deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete message");
      console.log("Error deleting message:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        {Array.isArray(message) && message.length > 0 ? (
          message.map((msg) => (
            <div
              key={msg._id}
              className="flex justify-between items-center p-2 border-t first:border-t-0 relative"
              onMouseEnter={() => setHoveredMessage(msg._id)}
              onMouseLeave={() => setHoveredMessage(null)}
            >
              <Mess message={msg} />
              {hoveredMessage === msg._id && (
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="absolute right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-opacity duration-200"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No messages available</p>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default Message;
