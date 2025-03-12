  import React from 'react';
  import useConversation from '../../statemanage/userconversation';

  function Users({ user }) {
    const { selectedconversation, setselectedconversation } = useConversation();

  // Prevents rendering if user or name is missing

    const isselected = selectedconversation?._id === user._id;
   
    return (
      <div
        className={`flex items-center gap-3 cursor-pointer duration-300 p-3 ${
          isselected ? "bg-slate-700" : "hover:bg-slate-600"
        }`}
        onClick={() => {
          setselectedconversation(user)
      
          
        }}
      >
        <div className="w-11 h-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
          <img
            src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        {user.name && <h1 className="font-bold">{user.name}</h1>}
      </div>
    );
  }

  export default Users;
