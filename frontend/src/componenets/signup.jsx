import React, { useState } from "react";
import axios from "axios";
import { useauth } from "../context/authcontext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
    const [user, setuser] = useauth();
    const navigate = useNavigate();
    
    const [formdata, setformdata] = useState({
        email: "",
        username: "",
        password: "",
        confirmpassword: "",
    });

    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            localStorage.setItem("pendingEmail", formdata.email);

             localStorage.setItem("formdata",JSON.stringify(formdata))
           
          
            
                
            

            if (!(
                formdata.email.endsWith("@gmail.com") || 
                formdata.email.endsWith("@yahoo.com") || 
                formdata.email.endsWith("@chitkara.edu.in")
            )) {
                setTimeout(() => {
                    toast.error("Enter a valid email");
                }, 1500);
                return;
            }
            navigate("/otp");

            
           

        } catch (error) {
            console.error("Error in signup:", error.response?.data?.error || error);

            if (error.response?.data?.error === "Username already exist") {
                setTimeout(() => {
                    toast.error("Please enter a unique username");
                }, 1500);
                return;
            }

            setTimeout(() => {
                toast.error("An error occurred during signup");
            }, 1500);
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-100">
            <form className="bg-white shadow-lg p-6 rounded-lg w-96" onSubmit={handlesubmit}>
                <h1 className="text-2xl font-semibold text-center mb-4">Welcome Back!</h1>
                
                <div className="space-y-4">
                    <label className="flex items-center border rounded-md p-2 bg-gray-50">
                        <input type="email" name="email" value={formdata.email} onChange={handlechange} className="ml-2 w-full bg-transparent outline-none" placeholder="Email" required />
                    </label>

                    <label className="flex items-center border rounded-md p-2 bg-gray-50">
                        <input type="text" name="username"  className="ml-2 w-full bg-transparent outline-none" placeholder="Username" value={formdata.username} onChange={handlechange} required />
                    </label>

                    <label className="flex items-center border rounded-md p-2 bg-gray-50">
                        <input type="password" name="password"  className="ml-2 w-full bg-transparent outline-none" placeholder="Password" value={formdata.password} onChange={handlechange} required />
                    </label>

                    <label className="flex items-center border rounded-md p-2 bg-gray-50">
                        <input type="password" name="confirmpassword"  className="ml-2 w-full bg-transparent outline-none" placeholder="Confirm Password" value={formdata.confirmpassword} onChange={handlechange} required />
                    </label>
                </div>

                <p className="text-sm text-gray-600 mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>

                <button type="submit" onClick={handlesubmit} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default Signup;
