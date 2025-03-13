import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import usegetalluser from '../../context/usegetalluser';
import useConversation from '../../statemanage/userconversation';
import { toast } from 'react-hot-toast';

function SearchBar() {
  const [search, setSearch] = useState("");
  const [allUsers] = usegetalluser();
  const { setselectedconversation } = useConversation();

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
    <div className="px-4 sm:px-6 md:px-8 py-4 bg-white rounded-xl shadow-md w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:flex-1 px-4 py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Search user by name..."
        />
        <button
          type="submit"
          className="w-full sm:w-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition duration-300"
        >
          <IoSearch className="text-xl sm:text-2xl" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
