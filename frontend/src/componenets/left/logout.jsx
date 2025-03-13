import axios from 'axios';
import React from 'react';
import { MdOutlineLogout } from "react-icons/md";
import { usecontext } from '../../context/socketcontext';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Logout() {
  const { socket } = usecontext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/logout`);
      if (response.data.message === "user logged out succesfully") {
        localStorage.removeItem("messenger");
        localStorage.removeItem("token");

        toast.success("Logout successful");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred during logout");
    }
  };

  return (
    <div className="w-full md:w-auto flex justify-end p-2 bg-black text-white">
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-300"
      >
        <MdOutlineLogout className="text-2xl" />
        <span className="hidden md:inline">Logout</span>
      </button>
    </div>
  );
}

export default Logout;
