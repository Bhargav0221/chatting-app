import React from 'react';
import Search from './search';
import User from './user';

function Left() {
  return (
    <div className="w-[35%] md:w-[35%] lg:w-[30%] h-screen overflow-y-auto bg-black text-white border-r border-gray-700">
      <Search />
      <hr className="border-gray-600" />
      <User />
    </div>
  );
}

export default Left;
