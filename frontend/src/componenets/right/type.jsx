import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/usersendmessage';

function Type() {
    const { loading, sendmessage } = useSendMessage();
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        sendmessage(message);
        setMessage("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-2xl shadow-sm border border-gray-300"
        >
            <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-4 py-2 bg-transparent text-gray-800 placeholder-gray-500 outline-none text-base"
            />
            <button
                type="submit"
                disabled={loading}
                className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                title="Send"
            >
                <IoSend size={22} />
            </button>
        </form>
    );
}

export default Type;
