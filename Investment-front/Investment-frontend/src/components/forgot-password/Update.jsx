
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Update() {

  const navigate = useNavigate();
  axios.defaults.withCredentials = true

  const [updateData, setUpdateData] = useState({
    
    password: "",
    confirmPassword : "",
  });

  const [processing, setProcessing] = useState(false); // State for tracking request processing

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const formData = new FormData()
    formData.append("password", updateData.password)

  const handleSubmit = async (e) => {
    e.preventDefault();
   // Add your form submission logic here

    if (processing) return; // Prevent multiple form submissions
    setProcessing(true); // Set processing state to true
    const {  password, confirmPassword } = updateData;
  
      if (password !== confirmPassword) {
        //console.log("Password and Confirm Password do not match");
        return;
      }
      //console.log(password)

   

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/adminpanel/update-password/",
        formData
      );
      //console.log(response.data);
      // Save token to local storage
     
     

    
      
      navigate("/sign-in");
      toast.success("Password Updated Successfully", {
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
  
  return (
    <>
    <div className="h-screen ">
        <div className="my-44 md:my-28 relative flex justify-center border-2 mx-5 md:mx-[450px] ">
          <form action="" className="py-40" onSubmit={handleSubmit}>
            <div className=" flex flex-col">
              <label htmlFor="email">New password <span className="text-red-500">*</span></label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="border-2 border-gray-300 w-80 md:w-96 bg-white rounded-sm mt-2 h-9 px-1"
              />
            </div>
            <div className=" flex flex-col mt-3">
              <label htmlFor="email">Re-enter password <span className="text-red-500">*</span></label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter Password"
                onChange={handleChange}
                className="border-2 border-gray-300 w-80 md:w-96 bg-white rounded-sm mt-2 h-9 px-1"
              />
            </div>
            <button type ="submit" className="bg-sky-500 text-white px-2 py-2 mt-3 rounded-md hover:bg-sky-600 shadow-sm">UPDATE PASSWORD</button>
          </form>
        </div>
      </div>
      
    </>
  )
}

export default Update
