import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [addresses, setAddresses] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [opendiv, setOpendiv] = useState(false);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();
  //fetch user data
  useEffect(() => {
    const fetchDepositData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const header = {
          token: token,
        };

        const response = await axios.get(
          "http://127.0.0.1:8000/user/auth/get-user-details/",
          {
            headers: header,
          }
        );

        setDetails(response.data.details);
        console.log(response);
      } catch (e) {
        // console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDepositData();
  }, []);

  //opendiv onclick
  const handleOnclick = (e) => {
    e.preventDefault();
    setOpendiv(!opendiv);
  };


  //Onchange for form
  const handleOnchange = (e) =>
  {
    setAddresses(e.target.value)
    console.log(e.target.value)
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (processing) return; // Prevent multiple form submissions
    setProcessing(true); // Set processing state to true

    // const data = {list : list , address : formData}
    console.log(processing)
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/auth/set-wallet-address/",
        
          { 
            "wallet_address" : addresses,
            
          },
      {
         
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        
      );
      console.log(response.data);
      toast.success("Wallet Address Updated", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className : ""
      });
      // if (response.status === 200) {
      //   // Redirect to another page
      //   window.location.href = '/dash/profile';
      // } else {
      //   console.error('Unexpected response status:', response.status);
      // }

      
    } catch (error) {
      console.error("error occured");
      console.error(error);
      toast.error("Update request failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className : ""
      });
    }
    setProcessing(false);
   
  };


  const handleLogout = (e) => {
    e.preventDefault();

    // remove jwt token
    localStorage.removeItem("token");
    navigate("/sign-in");

    // Display success toast notification
    toast.success("Logout successful!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Duration in milliseconds
    });
  };
  return (
    <>
      {loading ? (
        <div
          className={`w-full h-full flex justify-center min-h-screen md:min-h-screen items-center ${
            loading ? "block" : "hidden"
          }`}
        >
          <div className="w-16 h-16 rounded-full border-t-4 border-blue-500 border-solid animate-spin" />
        </div>
      ) : (
        <div className="bg-gray-900 font-opsans h-screen md:min-h-screen mx-2 md:px-5 md:py-4 md:mx-0">
          <div className="text-white py-5 px-4 md:px-2 flex">
            <BiSolidUserCircle className="w-6 h-6" />

            <div className="font-bold ml-2">{details.username}</div>
          </div>
          <div className="text-white px-4 md:px-2">
            <div>Name : {details.name}</div>
            <div>Email : {details.email}</div>
            <div>Date of Registration : {details.date}</div>
            <div>Refferal Link : {details.referral_link}</div>
          </div>

          <div className="text-white mt-5 md:mt-5 ml-2 ">
            <div className="mb-5">Wallet Address</div>
            <div className="md:flex">
              <span className="border-2 border-white px-2 md:px-2 py-1 rounded-md">
                {details.wallet_address === null ? "Address not set" : details.wallet_address }
              </span>
              <button
                className="md:mx-3 md:mt-0 mt-3 px-3 py-1 bg-white rounded-md text-black font-semibold"
                onClick={handleOnclick}
              >
                UPDATE
              </button>
            </div>
            {opendiv && (<>
              <form className="text-black mt-5" onSubmit={handleOnSubmit}>
                <label className="text-black">
                  <div className="md:flex md:mt-0 mt-4">
                  <div className="text-white ">New Wallet Address:</div>
                  <input type="text" name="waddress" value={addresses} onChange={handleOnchange} className="md:ml-2 w-full md:w-96"/>
                  </div>
                  
                </label>
                <button type="submit" value="Submit" className="mt-3 px-3 py-1 bg-white rounded-md text-black font-semibold" >{processing ? "Processing" : "SUBMIT"}</button>
              </form>
              
            </>)}
            
          </div>

          <div className="bg-white rounded-md w-10 h-10 mt-10 mx-2 md:mx-0 ml-0 md:ml-2 ">
            {/* Logout View */}
            <button
              className="px-3 py-2 flex bg-white rounded-md text-black font-semibold"
              onClick={handleLogout}
            >
              <span className="mr-2 mt-1">
                <FiLogOut />
              </span>
              LOGOUT
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
