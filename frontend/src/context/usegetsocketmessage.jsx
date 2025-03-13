import React, { useEffect } from 'react';
import { usecontext } from './socketcontext';
import useConversation from '../statemanage/userconversation';

const usegetsocketmessage = () => {
    const { message, setmessage } = useConversation();
    const { socket } = usecontext();

    useEffect(() => {
        const handleNewMessage = (newmessage) => {
            if (message.length > 0) {
                setmessage([...message, newmessage]);
            }
            else {
                setmessage([newmessage])
            }
        };

        socket.on("newmessage", handleNewMessage);

        return () => {
            socket.off("newmessage", handleNewMessage);
        };
    }, [socket, message, setmessage]);
};

export default usegetsocketmessage;
