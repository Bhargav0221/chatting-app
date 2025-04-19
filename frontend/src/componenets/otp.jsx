import { useState, useEffect } from "react";
import axios from "axios";
import { useauth } from "../context/authcontext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const [user, setuser] = useauth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const email = localStorage.getItem("pendingEmail");
 const formData=JSON.parse(localStorage.getItem("formdata"));
 console.log("formdata is",formData);
  

  // ✅ Send OTP
  const sendOtp = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/otp/send-otp`, { email });
      setOtpSent(true);
      setMessage("OTP sent successfully! Check your email.");
     
      
     
    } catch (error) {
      setMessage("Failed to send OTP. Try again.");
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    try {
      console.log("Sending:", { email, otp });
      await axios.post(`${import.meta.env.VITE_API_URL}/otp/verify-otp`, { email, otp });
      setMessage("OTP Verified Successfully!");
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, {
        email: formData.email,
        name: formData.username,
        password: formData.password,
        confirmpassword: formData.confirmpassword,
    });

    if (response.data) {
        
       
       

        // Store user data in localStorage
        localStorage.setItem("messenger", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.removeItem("otpstatus");
        toast.success("Signup successful");
        setuser(response.data); // Update auth context

        console.log("User is created:", response.data.user);
        console.log("Token:", response.data.token);
        localStorage.removeItem("pendingEmail");
        localStorage.removeItem("formdata");
        
        navigate("/");
    }
     
    } catch (error) {
      console.log("signup erro is",error);
      
      setMessage("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">OTP Verification</h2>
        {message && <p className="text-center text-sm text-gray-600">{message}</p>}

        {/* Send OTP Button */}
        {!otpSent && (
          <button
            onClick={sendOtp}
            className="mt-3 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send OTP to {email}
          </button>
        )}

        {/* OTP Input & Verify Button */}
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
};

export default OTPVerification;
