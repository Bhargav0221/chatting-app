import React from 'react';
import Search from './search';
import User from './user';
import Logout from './logout';

function Left() {
  return (
    <div className="flex flex-col h-screen w-full md:w-[35%] lg:w-[30%] bg-black text-white border-r border-gray-700">
      
      <div className="flex-1 overflow-y-auto">
        <Search />
        <hr className="border-gray-600" />
        <User />
      </div>

     
      <div className="border-t border-gray-700 p-3">
        <Logout />
      </div>
    </div>
  );
}

export default Left;
