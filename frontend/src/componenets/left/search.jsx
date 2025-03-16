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
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="flex-grow px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black shadow-sm"
        />
        <button
          type="submit"
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
        >
          <IoSearch size={24} />
        </button>
      </form>
    </div>
  );
}

export default Search;
