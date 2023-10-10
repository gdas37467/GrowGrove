import React from "react";
import { useState,useEffect } from "react";
import { SiAuthy } from "react-icons/si";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";



function TwoFA() {
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [base64Image, setBase64Image] = useState("");
  const navigate = useNavigate();
  //HandleENable
  const handleEnable = async (event) => {
    event.preventDefault();
    if (processing) return; // Prevent multiple form submissions
    setProcessing(true); // Set processing state to true

    // const data = {list : list , address : formData}
    //console.log(processing)
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/adminpanel/genQr/",
        
         
      {
         
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        
      );
      //console.log(response.data);
      const is2fa = response.data.is2fa;
      
      localStorage.setItem("lbp2mpf_ma", is2fa);
      navigate("/enable");
      
      

      
    } catch (error) {
      console.error("error occured");
      console.error(error);
      toast.error("QR genration Failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className : ""
      });
    }
    setProcessing(false);
   
  };
  let is2fa;

  if(localStorage.getItem("lbp2mpf_ma")){
    is2fa = jwtDecode(localStorage.getItem("lbp2mpf_ma"))['is2fa'];
   //console.log(is2fa);
   } else{
      is2fa = false
   }
  



  const handleDisable = async (event) => {
    event.preventDefault();
    if (processing) return; // Prevent multiple form submissions
    setProcessing(true); // Set processing state to true

    // const data = {list : list , address : formData}
    //console.log(processing)
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/adminpanel/disable/",
        
         
      {
         
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        
      );
      //console.log(response.data);
      
      
      localStorage.removeItem("lbp2mpf_ma");
      sessionStorage.removeItem("plv_cp");
      navigate("/");
      
      

      
    } catch (error) {
      console.error("error occured");
      console.error(error);
      toast.error("QR genration Failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className : ""
      });
    }
    setProcessing(false);
   
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
          <div className=" text-xl md:text-3xl text-white font-georgia flex md:pt-0 pt-6 px-2">
            <span className="text-xl md:text-3xl mr-2 md:mr-2 mt-1">
              <SiAuthy />
            </span>
            Enable Two-Factor{" "}
            <span className="text-violet-600 ml-2 md:ml-2">
              {" "}
              Authentication
            </span>
          </div>
          <div className="text-md md:text-xl text-gray-400 font-georgia mt-5 px-2 md:pr-20 md:pl-2">
            Two-factor authentication adds an extra layer of security to your
            account. It requires you to provide two different authentication
            factors to log in. This significantly reduces the risk of
            unauthorized access to your account.
          </div>

          <div className="md:flex mt-10 ">
            <Link to="/enable">
              <button className={`text-white bg-violet-600 font-georgia shadow-violet-400 rounded-md shadow-inner ml-2 md:ml-0 px-20 md:px-12 py-3 
              `}
              onClick={handleEnable}
              disabled={is2fa}
              >
                 {is2fa ?  "Enabled" : ( processing ? "Processing" :"Enable 2FA")}
              </button>
            </Link>
            
              <button className="text-violet-100 border-violet-600 font-georgia bg-gray-800 border-2 rounded-md px-20 md:px-12 shadow-inner md:mt-0 mt-5  py-3 ml-2 md:ml-5"
              disabled={!is2fa}
              onClick={handleDisable}>
                {!is2fa ?  "Disabled" : ( processing ? "Processing" :"Disable 2FA")}
              </button>
            
          </div>
          <div className="mt-5 md:mt-6 ml-2">
            <button
              onClick={handleEnable}
              className="text-white md:text-lg cursor-poiter font-georgia "
            >
              Mobile Device Disconnected?{" "}
              <span className="text-violet-600">Reactivate 2FA</span>
            </button>
          </div>
          <div className=""></div>
        </div>
      )}
    </>
  );
}

export default TwoFA;
