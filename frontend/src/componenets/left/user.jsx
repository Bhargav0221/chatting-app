import React from 'react'
import Users from './users'
import usegetalluser from '../../context/usegetalluser'

function User() {
  const [alluser, loading] = usegetalluser();

  console.log("alluser:", alluser);

  const handleUpload = () => {
    // Add your upload logic here (e.g., open file dialog or navigate to upload page)
    alert('Upload button clicked!');
  };

  return (
    <div className='max-h-[90vh] overflow-y-auto h-screen flex flex-col p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>All Users</h2>
        
      </div>

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
