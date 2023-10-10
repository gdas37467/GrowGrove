
import {HiOutlineUserCircle } from "react-icons/hi2";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CopyToClipboardButton  from "../CopyToClipboardButton"
import { Link } from "react-router-dom";

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
        //console.log(response);
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
   // console.log(e.target.value)
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (processing) return; // Prevent multiple form submissions
    setProcessing(true); // Set processing state to true

    // const data = {list : list , address : formData}
   // console.log(processing)
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
     // console.log(response.data);
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
      toast.error(error.response.data.error, {
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
    localStorage.removeItem("lik_rt_ad_loksminis");
    sessionStorage.removeItem("plv_cp");
    if(localStorage.getItem("superUser"))
    {
      localStorage.removeItem("superUser");
    }
    localStorage.removeItem("lbp2mpf_ma");
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
        <div className="bg-gray-900 font-opsans h-screen md:min-h-screen mx-2 mt-2 md:px-5 md:py-4 md:mx-0">
          <div className="md:flex justify-between">
          <div className="text-xl md:text-3xl font-extrabold text-white font-georgia flex md:pt-0 pt-6 px-2">
              <span className="text-xl md:text-3xl mr-2 md:mr-2 mt-1">
              <HiOutlineUserCircle className=" text-violet-600" />
              </span>
              Profile{" "}
              <span className="text-violet-600 ml-2 md:ml-2"> Portico</span>
            </div>



            <div className="bg-violet-500 rounded-md w-fit md:mt-0 mt-5 md:ml-0 ml-4">
            {/* Logout View */}
            <button
              className="px-2 md:px-3 py-1 flex bg-gray-900 rounded-md text-sm md:text-base text-violet-600 border-2 border-violet-600 font-semibold"
              onClick={handleLogout}
            >
              <span className="mr-2 mt-1">
                <FiLogOut className="text-violet-600"/>
              </span>
              LOGOUT
            </button>
          </div>

          </div>
          
          <div className="text-white md:text-lg font-georgia px-4 md:px-2 mt-5">
            <div>Username: {details.username}</div>
            <div>Name : {details.name}</div>
            <div>Email : {details.email}</div>
            <div>Date of Registration : {details.date}</div>
            <div>Payment Address: <span className="text-white">{details.wallet_address}</span></div>
            <div className="max-w-full overflow-hidden break-words">{"Referral Link : "} <span className="flex"> <span className="text-violet-600">
            {details.referral_link}</span> <span className="ml-3 mt-1"><CopyToClipboardButton text={details.referral_link} /> </span></span></div>
          </div>

          <div className="text-white mt-5 md:mt-5 ml-2 ">
            
            <div className="md:flex">
              <Link
                className="px-2 md:px-3 py-1 flex bg-gray-900 rounded-md text-sm md:text-base text-violet-600 border-2 border-violet-600 font-semibold"
                onClick={handleOnclick}
              >
                UPDATE PAYMENT ADDRESS
              </Link>
            </div>
            
            {opendiv && (<>
              <form className="text-black mt-5" onSubmit={handleOnSubmit}>
                <label className="text-black">
                  <div className="md:flex md:mt-0 mt-4">
                  <div className="text-white font-georgia">New Payment Address:</div>
                  <input type="text" name="waddress" value={addresses} onChange={handleOnchange} className="md:ml-2 w-full  md:w-1/2 h-10 mb-5 focus:outline-none focus:ring-0 focus:border-violet-600 rounded-md focus:border-2 bg-slate-800 border-slate-500 text-white font-georgia px-2 "/>
                  </div>
                  
                </label>
                <button type="submit" value="Submit" className="mt-3 px-3 py-1 bg-gray-900 rounded-md text-sm md:text-base text-violet-600 border-2 border-violet-600 font-semibold" >{processing ? "Processing" : "SUBMIT"}</button>
              </form>
              
            </>)}
            
          </div>

          
        </div>
      )}
    </>
  );
}

export default Profile;
