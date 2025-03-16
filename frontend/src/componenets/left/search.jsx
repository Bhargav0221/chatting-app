import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import usegetalluser from '../../context/usegetalluser';
import useConversation from '../../statemanage/userconversation';
import { toast } from 'react-toastify';

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = usegetalluser();
  const { setselectedconversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
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
    <div className="px-3 py-2 w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center w-full gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition duration-200 flex items-center justify-center"
          >
            <IoSearch className="text-lg sm:text-xl md:text-2xl" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
