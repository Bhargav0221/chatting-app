import axios from 'axios';
import React from 'react'
import { MdOutlineLogout } from "react-icons/md";
import { usecontext } from '../../context/socketcontext';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
function logout() {
  const {socket}=usecontext()
  const navigate=useNavigate();
  const logout=async ()=>{
    try{
    const response= await axios.post("http://localhost:5000/user/logout")
    if(response.data.message==="user logged out succesfully")
    {
        localStorage.removeItem("messenger");
        localStorage.removeItem("token");
    
        toast.success("Logout successful");
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
        
    }
    }
  catch(error)
  { 
    console.log(error);
    
   toast.error("Error occurred during logout");
  }

    
  }
  return (
    <div className='w-[6%] flex justify-end items-end bg-black'>
        <div className='p-3 justify-center align-bottom  font-extrabold text-3xl '>
            <button onClick={logout} className='px-3 hover:bg-slate-50 duration-200  rounded-lg'><MdOutlineLogout />
            </button>
        
        </div>
     
    </div>
  )
}

export default logout
