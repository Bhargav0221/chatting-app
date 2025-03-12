import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useauth } from "./authcontext";
import { io } from "socket.io-client"

const socketcontext = createContext();
export const usecontext = () => {

    return useContext(socketcontext);
};


export const SocketProvider = ({ children }) => {
    const [socket, setsocket] = useState(null);
    const [onlineUsers, setonlineuser] = useState([]);
    const [user] = useauth();
    useEffect(() => {
        if (user) {

            const socket = io(`${import.meta.env.VITE_API_URL}`, {
                query: {
                    userId: user._id,
                }
            })
            socket.on("connect", () => {
                console.log("✅ Connected to server, socket ID:", socket.id);
            });
            socket.on("getonline", (data) => {
                setonlineuser(data);


            })
            setsocket(socket);
            return () => socket.close();
        }
        else {
            if (socket) {
                socket.close();
                setsocket(null);
            }
        }
    }, [user])
    return (
        <socketcontext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketcontext.Provider>
    );
}