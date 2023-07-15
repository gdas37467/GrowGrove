import React from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom';

function Navbar() {

    
    
      let [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-20">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
          <div
            className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
          >
            <span className="text-6xl text-indigo-600 mr-1 pt-2">
              <ion-icon name="logo-ionic"></ion-icon>
            </span>
            CRYPTOPTION
          </div>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-10 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>

          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            }`}
          >
            <li className="md:ml-8 text-md md:my-0 my-7">
              <a
                href="/"
                className="text-gray-800 hover:text-gray-400 duration-500 font-opsans"
              >
                HOME
              </a>
            </li>
            <li className="md:ml-8 text-md md:my-0 my-7">
              <Link
                to="/sign-in"
                className="text-gray-800 hover:text-gray-400 duration-500 font-opsans"
              >
                ABOUT
              </Link>
            </li>
            <li className="md:ml-8 text-md md:my-0 my-7">
              <a
                href="/adminpanel"
                className="text-gray-800 hover:text-gray-400 duration-500 font-opsans"
              >
                CONTACT
              </a>
            </li>
            <li className="md:ml-8 text-md md:my-0 my-7">
              <Link
                to="/dash/profile"
                className="text-gray-800 hover:text-gray-400 duration-500 font-opsans"
              >
                GET STARTED
              </Link>
            </li>
          </ul>
        </div>
      </div>
  )
}

export default Navbar
