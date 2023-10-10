import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


function Email() {
    const navigate = useNavigate();
    const [email,setEmail] = useState('')
    const [processing, setProcessing] = useState(false); // State for tracking request processing
    axios.defaults.withCredentials = true
    
    
    const handleChange = (e) => {
        setEmail(e.target.value)
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
       // Add your form submission logic here
    
        if (processing) return; // Prevent multiple form submissions
        setProcessing(true); // Set processing state to true
    
        
       // console.log(email)
       
        //send as formDATA
        const formData = new FormData()
        formData.append("email", email)
 
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/adminpanel/send-otp/",
            
             formData
              
            
          );
        //  console.log(response.data);
          // Save token to local storage
        
         
        //sessionStorage.setItem("email" , email)
          
          navigate("/verify-otp");
          toast.success("OTP has been sent to your registered email", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, // Duration in milliseconds
            className : ""
          });
            
           
          // Display success toast notification
          
        } catch (error) {
          //console.log(error.response.data.message)
          // Display error toast notification
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
    
        setProcessing(false); // Reset processing state to false after request completion
      };




  return (
    <>
      <div className="h-screen ">
        <div className="my-44 md:my-28 relative flex justify-center border-2 mx-5 md:mx-[450px] ">
          <form onSubmit={handleSubmit} className="py-40">
            <div className=" flex flex-col">
              <label htmlFor="email">Enter your registered email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                
                onChange={handleChange}
                className="border-2 border-gray-300 w-80 md:w-96 bg-white rounded-sm mt-2 h-9 px-1"
              />
            </div>
            <button type ="submit" className="bg-sky-500 text-white px-2 py-2 mt-3 rounded-md hover:bg-sky-600 shadow-sm">REQUEST OTP</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Email;
