import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
export const AuthContext = createContext();
import axios from "axios";
const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
 const navigate=useNavigate();
  useEffect(() => {
    const checktoken=async()=>{
    try {
      const initialUserState = localStorage.getItem("messenger");
       const token=localStorage.getItem("token");
  
       if(!token)
       {
        navigate("/login");
        return ;
       }
          const response= await(axios.get(`${import.meta.env.VITE_API_URL}/user/protected`,{
            headers: {
              Authorization: `Bearer ${token}`, // Correctly pass token in the Authorization header
            },
    
          }));
      // Check if initialUserState is null or undefined
      if (response.data.message=="token is valid") {
        if(initialUserState)
                  {
        const parsedUser = JSON.parse(initialUserState);

        console.log("User from localStorage:", parsedUser); // Log user data to verify it's correct
        setuser(parsedUser);
        console.log(response.data.message);
      } 
    }else {
      
       localStorage.removeItem("messenger");
       localStorage.removeItem("token");
       setuser(null);
         navigate("/login");
      }
    } catch (error) {
  
      console.log("Error in token verification:", error);

   
        if (error.response && error.response.status === 401) {
          console.log("Token expired, logging out...");
          localStorage.removeItem("messenger");
          localStorage.removeItem("token");
          setuser(null);
          navigate("/login")
        }
    }
  }

  checktoken()
  const set=setInterval(checktoken,8*64*1000);
    

  }, []);

  return (
    <AuthContext.Provider value={[user, setuser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useauth = () => useContext(AuthContext);
export default AuthProvider;
