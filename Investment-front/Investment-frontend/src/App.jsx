import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/customerDash/Dashboard";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";

import ScrollToTop from "./components/ScrollToTop";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import { ToastContainer } from "react-toastify";
import ContactUs from "./components/ContactUs";

import Admin from "./components/admin/Admin";
import About from "./components/About";
import Email from "./components/forgot-password/Email";
import Otp from "./components/forgot-password/Otp";
import Update from "./components/forgot-password/Update";
import Enable from "./components/customerDash/Enable";
import Verify from "./components/customerDash/Verify";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";


function App() {
  const location = useLocation();
  const hideNavbarFooterRoutes = [
    "/sign-in",
    "/sign-up/:id",
    "/send-otp",
    "/verify-otp",
    "/update-password",
    "/verify-authy",
  ];
  //secret-key
  const secretKey = "CRYPT_PROJECT"
  
 

  

  //isAuthenticated
  const isAuthenticated = !!localStorage.getItem("token");
 // console.log(isAuthenticated)
  let is2FA,isVerified;
  //const [is2FA,setIs2FA] = useState(false);
  //const[isVerified,setIsVerified] = useState(false);
  if(localStorage.getItem("lbp2mpf_ma")){
   is2FA = jwtDecode(localStorage.getItem("lbp2mpf_ma"))['is2fa'];
  //console.log(is2FA);
  } else{
     is2FA = false
  }
  if(sessionStorage.getItem("plv_cp"))
  {
    isVerified = jwtDecode(sessionStorage.getItem("plv_cp"))['verified'];
  }else{
    isVerified = false
  }


  //console.log(is2FA);
  //console.log(isVerified)
  // useEffect(()=>{
		
  //   if(!!localStorage.getItem("superUser"))
  //   {
  //     localStorage.removeItem("superUser")
  //     localStorage.removeItem("token")
  //   }
	// }, [])
  
  
  
  
  



 


  const shouldHideNavbarFooter = hideNavbarFooterRoutes.find((route) => {
    const pathPattern = new RegExp(`^${route.replace("/:id", "/[^/]+")}$`);
    return pathPattern.test(location.pathname);
  });

  return (
    <div className="App">
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        {!shouldHideNavbarFooter && <Navbar />}
        <Routes>
          <Route
            exact
            path="/"
            element={
              is2FA ? (
                isVerified ? (
                  <Homepage />
                ) : (
                  <Navigate to="/verify-authy" />
                )
              ) : (
                <Homepage />
              )
            }
          />
          <Route
            exact
            path="/dash/*"
            element={
              isAuthenticated ? (
                is2FA ? (
                  isVerified ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/verify-authy" />
                  )
                ) : (
                  <Dashboard />
                )
              ) : (
                <Navigate to="/sign-in" />
              )
            }
          />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/sign-up/:sponsorName" element={<SignUp />} />
          <Route
            exact
            path="/adminpanel"
            element={isAuthenticated ? <Admin /> : <Navigate to="/sign-in" />}
          />
          <Route exact path="/send-otp" element={<Email />} />
          <Route exact path="/verify-otp" element={<Otp />} />
          <Route exact path="/update-password" element={<Update />} />
          <Route
            exact
            path="/contact-us"
            element={
              is2FA ? (
                isVerified ? (
                  <ContactUs />
                ) : (
                  <Navigate to="/verify-authy" />
                )
              ) : (
                < ContactUs/>
              )
            }
          />
          <Route
            exact
            path="/about"
            element={
              is2FA ? (
                isVerified ? (
                  <About />
                ) : (
                  <Navigate to="/verify-authy" />
                )
              ) : (
                <About />
              )
            }
          />
          <Route
            exact
            path="/enable"
            element={isAuthenticated ? <Enable /> : <Navigate to="/sign-in" />}
          />
          <Route
            exact
            path="/verify-authy"
            element={isAuthenticated ? <Verify /> : <Navigate to="/sign-in" />}
          />
        </Routes>
      </div>
      <div className="">{!shouldHideNavbarFooter && <Footer />}</div>
      <ToastContainer />
    </div>
  );
}

export default App;
