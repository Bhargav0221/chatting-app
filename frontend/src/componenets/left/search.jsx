import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import usegetalluser from '../../context/usegetalluser';

function Search() {
  const { alluser } = usegetalluser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setFilteredUsers([]);
      return;
    }

    const filtered = alluser.filter((user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className='px-6 py-3'>
      <form onSubmit={handleSearch}>
        <div className='flex space-x-3 h-[10vh]'>
          <label className="input input-bordered flex items-center gap-2 w-[80%]">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <button type="submit">
            <IoSearch className='text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300' />
          </button>
        </div>
      </form>

      {/* Render Filtered Users */}
      {filteredUsers.length > 0 ? (
        <div className='mt-4 space-y-2'>
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className='bg-gray-200 p-2 rounded-lg shadow-sm'
            >
              {user.name}
            </div>
          ))}
        </div>
      ) : (
        searchTerm && <p className='text-gray-500 mt-4'>No users found.</p>
      )}
    </div>
  );
}

export default Search;
