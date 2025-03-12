import React from "react";
import ChatUser from "./chatuser";
import Message from "./message";
import Type from "./type";
import useConversation from '../../statemanage/userconversation'
import { usecontext } from "../../context/socketcontext";

function Right() {
  const { selectedconversation } = useConversation();
  const {onlineUsers}=usecontext();
  if (!selectedconversation) {
    return (
      <div className="w-[70%] flex items-center justify-center h-screen text-white bg-black">
        <p className="text-gray-400">No conversation selected</p>
      </div>
    );
  }

  return (
    <div className="w-[70%] max-h-[100vh] flex flex-col text-white bg-black shadow-lg rounded-lg overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center bg-gray-800 hover:bg-gray-700 duration-300 p-4 border-b border-gray-700">
        <div className="mr-3">
          <ChatUser />
        </div>
        <div>
          <h1 className="text-xl font-semibold">{selectedconversation?.name || "Unknown"}</h1>
          <span className="text-sm text-green-400">{onlineUsers.includes(selectedconversation._id)?"online":"offline"}</span>
        </div>
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 ">
        <Message />
      </div>

      {/* Input Section */}
      <div className="w-full h-[10vh] flex items-center justify-center px-6 border-t">
        <Type />
      </div>
    </div>
  );
}


export default Right;
