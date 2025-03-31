import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useauth } from '../context/authcontext';
function OtpVerification2() {
  const email=localStorage.getItem("pendingEmail");
  const[user,setuser]=useauth();
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const formdata=JSON.parse(localStorage.getItem("formdata"));
  const sendOtp = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/otp/send-otp`, { email });
      setOtpSent(true);
      setMessage("OTP sent successfully! Check your email.");
      toast.success("Otp verified succesfuly");
        axios.post(`${import.meta.env.VITE_API_URL}/user/login`,{
             email:formdata.email,password:formdata.password
            })
            .then((response)=>{
            
             
            localStorage.setItem("messenger",JSON.stringify(response.data.user));
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("pendingEmail", formdata.email);
           toast.success("Login Successful")
        
           
                  })
                  .catch((error)=>{
                    console.log("error in login",error);
                  })
      
     
    } catch (error) {
      setMessage("Failed to send OTP. Try again.");
    }
  };

  const verifyOtp =async () => {
 try{
    await axios.post(`${import.meta.env.VITE_API_URL}/otp/verify-otp`, { email, otp });
    setMessage("OTP Verified Successfully!");
    toast.success("otp verified successfuly")
 }
 catch(error)
 {
    setMessage("Invalid OTP. Try again.");
 }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">OTP Verification</h2>
        {message && <p className="text-center text-sm text-gray-600">{message}</p>}

        {!otpSent && (
          <button
            onClick={sendOtp}
            className="mt-3 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send OTP to {email}
          </button>
        )}

        {otpSent && (
          <div>
            <label className="block text-gray-700 mt-4">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter OTP"
            />
            <button
              onClick={verifyOtp}
              className="mt-3 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OtpVerification2;
