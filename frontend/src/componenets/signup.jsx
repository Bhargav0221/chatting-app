import React, { useState } from 'react';
import axios from 'axios';
import { useauth } from '../context/authcontext';
import { Link } from 'react-router-dom'; // Import Link
import { toast } from 'react-toastify';
function Signup() {
    const [user, setuser] = useauth();
    const [formdata, setformdata] = useState({
        email: '',
        username: '',
        password: '',
        confirmpassword: '',
    });

    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (formdata.password !== formdata.confirmpassword) {
            toast.error("Passwords do not match");
            return;
        }
        console.log("Form submitted", formdata);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, {
                email: formdata.email,
                name: formdata.username,
                password: formdata.password,
                confirmpassword: formdata.confirmpassword
            });

            console.log(response.data);
            if (response.data) {
                toast.success("Signup successful");
            }
            localStorage.setItem("messenger", JSON.stringify(response.data.user));
            localStorage.setItem("token",JSON.stringify(response.data.token));
            console.log("Token is", response.data.token);
            setuser(response.data.user);
            console.log("User is made in signup", user);
        } catch (error) {
            console.log("Error in signup", error);
            toast.error("An error occurred");
        }
    };

    return (
        <div className='h-screen w-full flex items-center justify-center bg-gray-100'>
            <form className='bg-white shadow-lg p-6 rounded-lg w-96' onSubmit={handlesubmit}>
                <h1 className='text-2xl font-semibold text-center mb-4'>Welcome Back!</h1>

                <div className='space-y-4'>
                    <label className="flex items-center border rounded-md p-2 bg-gray-50">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="email" name="email" value={formdata.email} onChange={handlechange} className="ml-2 w-full bg-transparent outline-none" placeholder="Email" />
                    </label>

                    <label className="flex items-center border rounded-md p-2 bg-gray-50">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input type="text" name="username" className="ml-2 w-full bg-transparent outline-none" placeholder="Username" value={formdata.username} onChange={handlechange} required />
                    </label>

                    <label className="flex items-center border rounded-md p-2 bg-gray-50">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                        <input type="password" name="password" className="ml-2 w-full bg-transparent outline-none" placeholder="Password" value={formdata.password} onChange={handlechange} required />
                    </label>

                    <label className="flex items-center border rounded-md p-2 bg-gray-50">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                        <input type="password" name="confirmpassword" className="ml-2 w-full bg-transparent outline-none" placeholder="Confirm Password" value={formdata.confirmpassword} onChange={handlechange} required />
                    </label>
                </div>

                <p className='text-sm text-gray-600 mt-4'>
                    Already have an account? <Link to='/login' className='text-blue-500'>Login</Link>
                </p>

                <button type='submit' className='mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition'>
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default Signup;
