import React from 'react';
import Left from './components/left/left';
import Right from './components/right/right';
import Signup from './components/signup';
import Login from './components/login';
import { useauth } from './context/authcontext';
import { Navigate, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  const [user] = useauth();

  console.log("user is made ", user);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <div className="flex flex-col md:flex-row h-screen w-full">
                <Left />
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
  );
}

export default App;
