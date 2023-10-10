import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Verify() {
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [otp,setOtp] = useState("");
    const handleChange = (e) => {
        setOtp(e.target.value)
      };

    const secretKey = 'x99hskab28#29@hsxmm00998*jcaoncmmxo';

      // Data to be encoded as a boolean claim
    
      
      // Create a JWT token with the boolean claim
    

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (processing) return; // Prevent multiple form submissions
    setProcessing(true); // Set processing state to true

    // const data = {list : list , address : formData}

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/adminpanel/verifyQr/",

        {
          otp
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      //console.log(response.data);

      toast.success("Authenticated", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className: "",
      });
      
      
      sessionStorage.setItem("plv_cp" ,response.data.success);
      navigate("/");
      // if (response.status === 200) {
      //   // Redirect to another page
      //   window.location.href = '/orderplaced';
      // } else {
      //   console.error('Unexpected response status:', response.status);
      // }
    } catch (error) {
      console.error("error occured");
      console.error(error);
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className: "",
      });
    }
    setProcessing(false);
    
  };

  return (
    <>
        <div className="h-screen ">
          <div className="my-44 md:my-28 relative flex justify-center  mx-5 md:mx-[450px] ">
            
            <form action="" className="py-40" onSubmit={handleSubmit}>
              <div className=" flex flex-col">
                <label htmlFor="email">
                  Enter six-digit OTP for 2-FA Verification<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="otp"
                  placeholder="OTP"
                  onChange={handleChange}
                  value={otp}
                  className="border-2 border-gray-300 w-80 md:w-96 focus:outline-none focus:ring-0 focus:border-violet-600 rounded-md bg-white rounded-sm mt-2 h-9 px-1"
                />
              </div>
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-violet-600 text-white px-2 py-2 mt-3 rounded-md shadow-inner border-2 border-violet-600"
                >
                  { processing ? "Processing" :"VERIFY OTP"}
                </button>
                
              </div>
             
            </form>
          </div>
        </div>
      </>
  )
}

export default Verify
