import React, { useEffect, useState } from 'react'
import  Cookies from"js-cookies";
import axios from 'axios';
function usegetalluser() {
    const [alluser, setalluser] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(() => {
        
            const getuser = async () => {
                setloading(true);
                try{
                const token = localStorage.getItem("token");
               const response= await axios.get(`${import.meta.env.VITE_API_URL}/user/getuser`, {
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setalluser(response.data.alluser);
                setloading(false);
            }
        
        catch (error) {
            console.log("error in" + error);
        }
        finally{
            setloading(false);
        }
    }
    getuser();
    }, [])
    return [alluser,loading];
        
}

export default usegetalluser
