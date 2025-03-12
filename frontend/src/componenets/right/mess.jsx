import React from 'react';

function Mess({ message }) {
    let user = null;
    try {
        const token = localStorage.getItem("messenger");
        user = token ? JSON.parse(token) : null;
    } catch (error) {
        console.error("Error parsing localStorage:", error);
    }

    const userId = user?._id?.toString().trim() || "";
    const senderId = message?.sender?.toString().trim() || "";

    console.log("User ID:", userId);
    console.log("Message Sender ID:", senderId);
    console.log("Comparison Check:", userId === senderId);

    const itsme = userId === senderId;

    return (
        <div className={`w-full flex ${itsme ? "justify-end" : "justify-start"} my-2`}>
            <div 
                className={`max-w-xs px-4 py-2 rounded-lg ${
                    itsme ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
                }`}
            >
                {message?.message || "No message content"}
            </div>          
        </div>
    );
}

export default Mess;
