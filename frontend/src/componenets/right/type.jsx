import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/usersendmessage';

function Type() {
    const { loading, sendmessage } = useSendMessage();
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        sendmessage(message);
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input 
                type="text" 
                placeholder="Type here..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                className="w-[70%] p-3 text-black border rounded-md"
            />
            <button type="submit" className="p-3 bg-blue-500 text-white rounded-md">
                <IoSend />
            </button>
        </form>
    );
}

export default Type;
