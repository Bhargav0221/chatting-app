import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { useauth } from '../context/authcontext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function login() {
    const[user,setuser]=useauth();
    const navigate=useNavigate();
    const [formdata,setformdata]=useState({
        email:'',
        password:'',
    })

    const handlechange=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value});
    }
    const handlesubmit=(e)=>{
        try{
        e.preventDefault();

        localStorage.setItem("pendingEmail",formdata.email);
        localStorage.setItem("formdata",formdata);
         navigate("/otp2");
        }catch(error){
        console.log("error in login"+error);
      toast.error("error occured ")
       }
    }
    return (
        <div className='h-screen w-full flex items-center justify-center bg-gray-100'>
        <form className='bg-white shadow-lg p-6 rounded-lg w-96 ' type="submit" onSubmit={handlesubmit}>
            <h1 className='text-2xl font-semibold text-center mb-4'>Welcome Back!</h1>
            
            <div className='space-y-4'>
                <label className="flex items-center border rounded-md p-2 bg-gray-50">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="email" name="email" onChange={handlechange}className="ml-2 w-full bg-transparent outline-none" placeholder="Email" required />
                </label>

                

                <label className="flex items-center border rounded-md p-2 bg-gray-50">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                    </svg>
                    <input type="password" name="password" onChange={handlechange}className="ml-2 w-full bg-transparent outline-none" placeholder="Password" required />
                </label>
                
                
            </div>
            
            <p className='text-sm text-gray-600 mt-4'>Dont have any account? <Link to={'/signup'} className='text-blue-500'>Signup</Link></p>
            
            <button type='submit' className='mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition'>
               Login
            </button>
        </form>
    </div>
    )
}

export default login
