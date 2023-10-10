
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Otp() {

    axios.defaults.withCredentials = true
    const navigate = useNavigate();
    const [otp,setOtp] = useState('')
    const [processing, setProcessing] = useState(false); // State for tracking request processing
    
    
    const handleChange = (e) => {
        setOtp(e.target.value)
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
       // Add your form submission logic here
    
        if (processing) return; // Prevent multiple form submissions
        setProcessing(true); // Set processing state to true
        const formData = new FormData()
  
    formData.append("otp", otp)
        
    
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/adminpanel/verify-otp/",
            
              formData,
              

            
          );
          //console.log(response.data);
          // Save token to local storage
        
         
        
          
          navigate("/update-password");
          toast.success("OTP verified", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, // Duration in milliseconds
            className : ""
          });
            
           
          // Display success toast notification
          
        } catch (error) {
          console.error("error occured");
          console.error(error.response.data.message);
          // Display error toast notification
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
    
        setProcessing(false); // Reset processing state to false after request completion
      };

      
      //const email = sessionStorage.getItem("email")

      const handleSubmit2 = async (e) => {
        e.preventDefault();
       // Add your form submission logic here
    
        if (processing) return; // Prevent multiple form submissions
        setProcessing(true); // Set processing state to true
    
        
    
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/adminpanel/resend-otp/",
            
             
            
          );
         // console.log(response.data);
          // Save token to local storage
        
         
        
          
          navigate("/verify-otp");
          toast.success("OTP re-sent", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000, // Duration in milliseconds
            className : ""
          });
            
           
          // Display success toast notification
          
        } catch (error) {
          console.error("error occured");
          console.error(error);
          // Display error toast notification
          toast.error(error.response.data.error, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
    
        setProcessing(false); // Reset processing state to false after request completion
      };


  return (
    <>
      <>
        <div className="h-screen ">
          <div className="my-44 md:my-28 relative flex justify-center border-2 mx-5 md:mx-[450px] ">
            <form action="" className="py-40" onSubmit={handleSubmit}>
              <div className=" flex flex-col">
                <label htmlFor="email">
                  Enter OTP<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="otp"
                  placeholder="OTP"
                
                  onChange={handleChange}
                  className="border-2 border-gray-300 w-80 md:w-96 bg-white rounded-sm mt-2 h-9 px-1"
                />
              </div>
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-2 py-2 mt-3 rounded-md hover:bg-sky-600 shadow-sm"
                >
                  VERIFY OTP
                </button>
                <button className="bg-sky-500 text-white px-2 py-2 mt-3 rounded-md hover:bg-sky-600 shadow-sm ml-2" onClick={handleSubmit2}>
                  RESEND OTP
                </button>
              </div>
              <div className="mt-2 text-gray-500 text-sm">* Please check both your inbox and spam folder for the OTP</div>
            </form>
          </div>
        </div>
      </>
    </>
  );
}

export default Otp;
