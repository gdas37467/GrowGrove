import React from 'react'
import {BiSolidUserCircle } from "react-icons/bi";
import { toast } from 'react-toastify';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate()

  const handleLogout = (e) =>{
    e.preventDefault();

    // remove jwt token
    localStorage.removeItem("token")
    navigate("/sign-in")

    // Display success toast notification
    toast.success('Logout successful!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Duration in milliseconds
    });
  }
  return (
    <div className='bg-gray-900 font-opsans h-screen md:min-h-screen mx-2 md:px-5 md:py-4 md:mx-0'>
      <div className='text-white py-5 px-4 md:px-2 flex'><BiSolidUserCircle className='w-6 h-6'/>
      
      <div className='font-bold ml-2'>{"JimmySher16"}</div>
      
      
      </div>
      <div className='text-white px-4 md:px-2'>
        <div>Name : {"Abhijeet Kumar"}</div>
        <div>Email : {"Abhijeet@99email.com"}</div>
        <div>Date of Registration : {"29/11/2005"}</div>
        <div>Refferal Link : {"xyz"}</div>
      </div>

      <div className="bg-white rounded-md w-10 h-10 mt-10 mx-4 md:mx-0 ">
              {/* Logout View */}
              <button className="px-3 py-2 flex bg-white rounded-md text-black" onClick={handleLogout}><span className="mr-2 mt-1"><FiLogOut/></span>
              LOGOUT</button>
            </div>
    </div>
  )
}

export default Profile
