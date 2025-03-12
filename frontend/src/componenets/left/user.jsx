import React from 'react'
import Users from './users'
import usegetalluser from '../../context/usegetalluser'


function User() {
  const [alluser,loading ] = usegetalluser(); // ✅ Correct destructuring

  console.log("alluser:", alluser);

  return (
    <div className='max-h-[90vh] overflow-y-auto h-screen flex flex-col '>
      {Array.isArray(alluser) && alluser.length > 0 ? (
        alluser.map((user, index) => (
          <Users key={index} user={user} />
        ))
      ) : (
        <p>No users found</p> 
      )}
    </div>
  );
}

export default User;
