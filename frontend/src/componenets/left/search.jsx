  import React from 'react'
  import { IoSearch } from "react-icons/io5";
  function search() {
    return (
      <div className='px-6 py-3'>
  <form >
      <div className='flex space-x-3 h-[10vh]'>
  <label className="input input-bordered flex items-center gap-2 w-[80%]">
    <input type="text" className="grow" placeholder="Search" />
  
  </label>
  <button     >
  <IoSearch className='text-5xl p-2  hover:bg-gray-600 rounded-lg duration-300'/>
  </button>
  </div>
  </form>
      </div>
    
    )
  }

  export default search
