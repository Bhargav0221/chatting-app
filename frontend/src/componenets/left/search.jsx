import React from 'react'
import { IoSearch } from "react-icons/io5";
import usegetalluser from '../../context/usegetalluser';
import useConversation from '../../statemanage/userconversation';
import { useState } from 'react';
function search() {
  const [search, setSearch] = useState("");
  const [allUsers] = usegetalluser();
  const { setselectedconversation} = useConversation();
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
      <form  onSubmit={handleSubmit}>
        <div className='flex space-x-3 h-[10vh]'>
          <label className="input input-bordered flex items-center gap-2 w-[80%]">
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}className="grow" placeholder="Search" />

          </label>
          <button     >
            <IoSearch className='text-5xl p-2  hover:bg-gray-600 rounded-lg duration-300' />
          </button>
        </div>
      </form>
    </div>

  )
}

export default search
