import React from 'react'
import { IoSearch } from "react-icons/io5";
import usegetalluser from '../../context/usegetalluser';
import useConversation from '../../statemanage/userconversation';
import { useState } from 'react';
import { toast } from 'react-toastify';
function search() {
  const [search, setSearch] = useState("");
  const [allUsers] = usegetalluser();
  const { setselectedconversation } = useConversation();
  console.log(allUsers);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.name?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setselectedconversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };
  return (


    <div className='px-6 py-3'>
      <form onSubmit={handleSubmit}>
        <div className='flex space-x-3 h-[10vh]'>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full md:w-[80%] px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black shadow-sm transition duration-200"
          />


          <button     >
            <IoSearch className='text-5xl p-2  hover:bg-gray-600 rounded-lg duration-300' />
          </button>
        </div>
      </form>
    </div>

  )
}

export default search
