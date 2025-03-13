import React from 'react';
import Left from './componenets/left/left';
import Right from './componenets/right/right';
import Logout from './componenets/left/logout';
import Signup from './componenets/signup';
import Login from './componenets/login';
import { useauth } from './context/authcontext';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

function App() {
  const [user] = useauth();
  console.log("user is made ", user);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <div className="flex flex-col md:flex-row h-screen overflow-hidden">
                  {/* Left Sidebar */}
                  <div className="w-full md:w-[30%] lg:w-[25%] border-r border-gray-300 overflow-y-auto bg-white">
                    <Logout />
                    <Left />
                  </div>

                  {/* Right Chat Area */}
                  <div className="w-full md:w-[70%] lg:w-[75%] overflow-y-auto">
                    <Right />
                  </div>
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
      </div>
    </>
  );
}

export default App;
