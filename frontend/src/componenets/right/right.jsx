import React from "react";
import ChatUser from "./chatuser";
import Message from "./message";
import Type from "./type";
import useConversation from "../../statemanage/userconversation";
import { usecontext } from "../../context/socketcontext";

function Right() {
  const { selectedconversation } = useConversation();
  const { onlineUsers } = usecontext();

  if (!selectedconversation) {
    return (
      <div className="w-full md:w-[70%] flex items-center justify-center h-screen bg-[#111b21] text-white">
        <p className="text-gray-400 text-lg">No conversation selected</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[70%] h-screen flex flex-col text-white bg-[#111b21]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-[#202c33]">
        <div className="flex items-center gap-3">
          <ChatUser />
          <div>
            <h1 className="text-lg font-semibold">{selectedconversation?.name || "Unknown"}</h1>
            <p className="text-sm text-green-400">
              {onlineUsers.includes(selectedconversation._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <Message />
      </div>

      {/* Input Section */}
      <div className="border-t border-gray-700 bg-[#202c33] px-4 py-3">
        <Type />
      </div>
    </div>
  );
}

export default Right;
