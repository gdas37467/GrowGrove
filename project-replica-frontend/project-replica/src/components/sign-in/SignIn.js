import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import rena from "../../signIn.png";
import { Link } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  // toast.success("Hello", {
  //   position: toast.POSITION.TOP_RIGHT,
  //   autoClose: 2000, // Duration in milliseconds
  // });
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const [processing, setProcessing] = useState(false); // State for tracking request processing

  const handleChange = (e) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   // Add your form submission logic here

    if (processing) return; // Prevent multiple form submissions
    setProcessing(true); // Set processing state to true

    const { email, password } = signinData;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/auth/signin/",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      // Save token to local storage
      const token = response.data.token;
     
      localStorage.setItem("token", token);
    
      
      navigate("/");
      toast.success("Login successful!", {
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
  const handleDontHaveAccount = () => {
    navigate("/sign-up/none");
  };

  return (
    <div className="md:min-h-screen mt-10">
      
      <div className="flex justify-center"><Link to = "/">
        <div
          className="font-bold text-4xl md:text-6xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <span className="text-5xl md:text-8xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          CRYPTOPTION
        </div></Link>
      </div>
      <div className="flex mt-10">
        <div className="md:w-3/5 collapse md:visible">
          <img src={rena} alt="" className=""/>
        </div>
        <div className="mt-5 md:mt-32 ml-2 md:ml-5">
          <div className="text-2xl md:text-3xl font-georgia font-bold flex justify-center">
            <h2>SIGN IN FORM</h2>
          </div>
          <form className="text-md font-opsans  font-extrabold" onSubmit={handleSubmit}>
            <div className="mt-5 md:mx-0 mx-8 flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="border-2 border-gray-300 w-80 md:w-96 bg-white rounded-sm mt-2 h-9 px-1"
                value={signinData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-5 md:mx-0 mx-8 flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="border-2 border-gray-300 w-80 md:w-96 bg-white rounded-sm mt-2 h-9 px-1"
                value={signinData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="w-80 md:w-96 md:mx-0 mx-8 bg-purple-800 text-white mt-5 h-10 hover:bg-purple-700">
              {processing ? "Processing..." : "Log In"}
            </button>
            <p className="flex justify-center mt-5 cursor-pointer hover:text-purple-700" onClick={handleDontHaveAccount}>
              Dont Have Account?
            </p>
          </form>
        </div>
      </div>
      
    </div>
  );
}

export default SignIn;
