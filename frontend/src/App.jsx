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
import 'react-toastify/dist/ReactToastify.css';
import OTPVerification from './componenets/otp'
import OtpVerification2 from './componenets/otp2'

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
          
        
          <Left />
        
           
        
           
         
          <Right />
        </div>
      ) : (
        <Navigate to="/signup" />
      )
    }
  />
<Route path="/otp" element={<OTPVerification />} />
<Route path="/otp2" element={<OtpVerification2/>}/>
  <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
  <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
</Routes>

      <ToastContainer />
</>
  
  )
}

export default App

