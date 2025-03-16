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

    <div className="px-4 py-3">
    <form onSubmit={handleSubmit}>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="flex-grow px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition"
          title="Search"
        >
          <IoSearch className="text-xl" />
        </button>
      </div>
    </form>
  </div>

  )
}

export default search
