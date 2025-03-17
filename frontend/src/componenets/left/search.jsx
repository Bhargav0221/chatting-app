]import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";
import usegetalluser from '../../context/usegetalluser';
import useConversation from '../../statemanage/userconversation';
import { toast } from 'react-toastify';

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = usegetalluser();
  const { setselectedconversation } = useConversation();
  const [uploading, setUploading] = useState(false);

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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('senderId', 'SENDER_ID'); // Replace dynamically
    formData.append('chatId', 'CHAT_ID');     // Replace dynamically

    setUploading(true);

    try {
      const res = await fetch('http://localhost:5000/api/upload/file', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.chatMessage) {
        toast.success("File uploaded successfully!");
        // Optionally emit message using socket or add to message list
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
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

        {/* Upload File Button */}
        <label className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white cursor-pointer">
          <IoMdCloudUpload size={24} />
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </form>
      {uploading && <p className="text-sm text-gray-600 mt-2">Uploading file...</p>}
    </div>
  );
}

export default Search;
