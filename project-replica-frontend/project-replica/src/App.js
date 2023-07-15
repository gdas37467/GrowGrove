import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/customerDash/Dashboard";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";

import ScrollToTop from "./components/ScrollToTop";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import { ToastContainer } from "react-toastify";
import Admin from './components/admin/Admin';

function App() {
  const location = useLocation();
  const hideNavbarFooterRoutes = ["/sign-in", "/sign-up/:id"];

const shouldHideNavbarFooter = hideNavbarFooterRoutes.find(route => {
  const pathPattern = new RegExp(`^${route.replace("/:id", "/[^/]+")}$`);
  return pathPattern.test(location.pathname);
});


  return (
    <div className="App">
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {!shouldHideNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/dash/*" element={<Dashboard />} />
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/sign-up/:sponsorName" element={<SignUp />} />
        <Route exact path="/adminpanel" element={<Admin />} />
      </Routes>
      
    </div>
    <div className="">
       {!shouldHideNavbarFooter && <Footer />} 
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
