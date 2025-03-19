import React, { useEffect } from 'react';
import { usecontext } from './socketcontext';
import useConversation from '../statemanage/userconversation';

const usegetsocketmessage = () => {
    const { message, setmessage } = useConversation();
    const { socket } = usecontext();
       const {selectedconversation } = useConversation();
    useEffect(() => {
        const handleNewMessage = (newmessage) => {
            if (newmessage.sender === selectedconversation?._id) {
                setmessage(prev => [...prev, newmessage]);
            }
       
        };

        socket.on("newmessage", handleNewMessage);

        return () => {
            socket.off("newmessage", handleNewMessage);
        };
    }, [socket, message, setmessage]);
};

export default usegetsocketmessage;
