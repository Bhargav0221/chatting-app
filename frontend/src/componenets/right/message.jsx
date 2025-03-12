import React, { useState } from 'react';
import Mess from './mess';
import Usegetmessage from '../../context/Usegetmessage';
import Loading from '../loading';
import axios from 'axios';
import usegetsocketmessage from '../../context/usegetsocketmessage';
import { usecontext } from '../../context/socketcontext';

function Message() {
  const { message, loading, setmessage } = Usegetmessage(); // Make sure `setMessage` updates context correctly
  usegetsocketmessage();
  const [hoveredMessage, setHoveredMessage] = useState(null);

  if (loading) {
    return <Loading />;
  }

  const handleDelete = async (msgId) => {
    if (!msgId) return;

    try {
      const response = await axios.post(`http://localhost:5000/Message/delete/${msgId}`);
      
      if (response.status === 200) {
        // ✅ Remove deleted message from UI
        const updatedMessages = message.filter((msg) => msg._id !== msgId);
        setmessage(updatedMessages); // <-- This is key to trigger re-render
      }
    } catch (error) {
      console.log("Error deleting message:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col">
      {message.length > 0 ? (
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
  );
}

export default Message;
