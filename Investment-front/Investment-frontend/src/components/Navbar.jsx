import { useState } from "react";
import { useLocation } from "react-router-dom";
import className from "classnames";

function Navbar() {
  let [open, setOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token");
  let  isAdmin = false;
  if(localStorage.getItem("lik_rt_ad_loksminis")){
  isAdmin= localStorage.getItem("lik_rt_ad_loksminis");
  }
  
  //console.log(isAdmin)
  const pathName = useLocation();
  //console.log(pathName);
  const linkCLasses = "md:ml-8 text-md md:my-0 my-7 ";

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-20">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-georgia
      text-gray-900"
        >
          <span className="text-6xl text-violet-600 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          GROWGROVE
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-10 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute  md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 md:pr-0 pr-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          <li
            className={className(
              pathName.pathname === "/"
                ? "bg-violet-600 px-3 py-1 rounded-md text-white"
                : "text-gray-900",
              linkCLasses
            )}
          >
            <a
              href="/"
              className=" hover:text-gray-400 duration-500 font-georgia"
            >
              HOME
            </a>
          </li>
          <li
            className={className(
              pathName.pathname === "/about"
                ? "bg-violet-600 px-3 py-1 rounded-md text-white"
                : "text-gray-900",
              linkCLasses
            )}
          >
            <a
              href="/about"
              className="hover:text-gray-400 duration-500 font-georgia"
            >
              ABOUT
            </a>
          </li>
          <li
            className={className(
              pathName.pathname === "/contact-us"
                ? "bg-violet-600 px-2 py-1 rounded-md text-white"
                : "text-gray-900",
              linkCLasses
            )}
          >
            <a
              href="/contact-us"
              className=" hover:text-gray-400 duration-500 font-georgia"
            >
              CONTACT
            </a>
          </li>
          <li
            className={className(
              pathName.pathname === "/dash/profile" ||
                pathName.pathname === "/dash/wallet" ||
                pathName.pathname === "/dash/packages" ||
                pathName.pathname === "/dash/referral" ||
                pathName.pathname === "/dash/deposit" ||
                pathName.pathname === "/dash/withdraw" ||
                pathName.pathname === "/dash/two-fa" ||
                pathName.pathname === "/adminpanel"
                ? "bg-violet-600 px-2 py-1 rounded-md text-white"
                : "text-gray-900",
              linkCLasses
            )}
          >
            {isAdmin === false && (
              <a
                href="/dash/profile"
                className=" hover:text-gray-400 duration-500 font-georgia"
              >
                {isAuthenticated ? "DASHBOARD" : "GET STARTED"}
              </a>
            )}
            {isAdmin === "true" && (
              <a
                href="/adminpanel"
                className=" hover:text-gray-400 duration-500 font-georgia"
              >
                {isAuthenticated ? "ADMIN DASHBOARD" : "GET STARTED"}
              </a>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
