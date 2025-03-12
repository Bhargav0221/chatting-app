import React from 'react'
import Search from './search'
import User from './user'
function left() {
  return (
    <div className=' w-[30%]  bg-black text-white'>
    
      <Search></Search>
      <hr />
      <User>

      </User>
    </div>
  )
}

export default left
