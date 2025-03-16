import React from 'react'
import Left from './componenets/left/left'
import Right from './componenets/right/right'
import Logout from './componenets/left/logout'
import Signup from './componenets/signup'
import Login from './componenets/login'
import { useauth } from './context/authcontext'
import { Navigate } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';



function App() {
  const [ user, setuser ] = useauth();
   
  
  console.log("user is made ",user);
  return (
<>
  
<Routes>
  <Route
    path="/"
    element={
      user ? (
        <div className="flex h-screen w-full">
          {/* Left Sidebar with Logout + Left content */}
          <div className="flex flex-col w-full md:w-[35%] lg:w-[30%] bg-black">
            <Logout />
            <Left />
          </div>

          {/* Right Chat Area */}
          <Right />
        </div>
      ) : (
        <Navigate to="/signup" />
      )
    }
  />
  <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
  <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
</Routes>

      <ToastContainer />
</>
  
  )
}

export default App

