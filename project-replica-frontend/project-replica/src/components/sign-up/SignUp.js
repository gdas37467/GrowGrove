import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams} from "react-router-dom";
import { toast } from "react-toastify";
import rena from "../../signIn.png"
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  //sign-up using referral website

  
  const { sponsorName } = useParams();

    
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({
      firstName : "",
      lastName : "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  
   console.log(sponsorName);



  
    const [processing, setProcessing] = useState(false); // State for tracking request processing
  
    const handleChange = (e) => {
      setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (processing) return; // Prevent multiple form submissions
      setProcessing(true); // Set processing state to true
  
      const { username, email, password, confirmPassword,firstName,lastName } = signupData;
  
      if (password !== confirmPassword) {
        console.log("Password and Confirm Password do not match");
        return;
      }
  
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/user/auth/signup/",
          {
            firstName,
            lastName,
            username,
            sponsorName,
            email,
            password,
          }
        );
        console.log(response.data);
  
        // Save token to local storage
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/");
  
        // Display success toast notification
        toast.success("Account Created successful!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } catch (error) {
        console.error("error occured");
        console.error(error);
  
        // Display error toast notification
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, // Duration in milliseconds
        });
      }
      setProcessing(false); // Reset processing state to false after request completion
    };
    const handleHaveAccount = () => {
      navigate("/sign-in")
    };


  return (
    <div className="md:min-h-screen mt-10">
      <div className="flex justify-center">
        <div
          className="font-bold text-4xl md:text-6xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <span className="text-5xl md:text-8xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          CRYPTOPTION
        </div>
      </div>
      <div className="flex mt-10">
        <div className="md:w-3/5 collapse md:visible">
          <img src={rena} alt="" className=""/>
        </div>
        <div className="mt-5 md:mt-2 mb-5 md:mb-10 ml-2 md:ml-5">
          <div className="text-2xl md:text-3xl font-georgia font-bold flex justify-center">
            <h2>SIGN UP FORM</h2>
          </div>
          <form className="text-md font-opsans  font-extrabold" onSubmit={handleSubmit}>
          <div className="mt-5 md:mx-0 mx-8 flex flex-col">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="border-2 border-gray-300 w-80 md:w-96 bg-white rounded-sm mt-2 h-9 px-1"
                value={signupData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-5 md:mx-0 mx-8 flex flex-col">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="border-2 border-gray-300 w-80 md:w-96 bg-white rounded-sm mt-2 h-9 px-1"
                value={signupData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          <div className="mt-5 md:mx-0 mx-8 flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                className="border-2 border-gray-300 w-80 md:w-96 bg-white rounded-sm mt-2 h-9 px-1"
                value={signupData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-5 md:mx-0 mx-8 flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="border-2 border-gray-300 w-80 md:w-96 bg-white rounded-sm mt-2 h-9 px-1"
                value={signupData.email}
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
                value={signupData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-5 md:mx-0 mx-8 flex flex-col">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="border-2 border-gray-300 w-80 md:w-96 bg-white rounded-sm mt-2 h-9 px-1"
                value={signupData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="w-80 md:w-96 md:mx-0 mx-8 bg-purple-800 text-white mt-5 h-10 hover:bg-purple-700">
              {processing ? "Processing..." : "Sign Up"}
            </button>
            <p className="flex justify-center mt-5 cursor-pointer hover:text-purple-700" onClick={handleHaveAccount}>
              Already Have an Account?
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
