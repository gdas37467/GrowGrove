import  { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {HiOutlineWallet } from "react-icons/hi2";


// eslint-disable-next-line
let amountInvested = 0;
// eslint-disable-next-line
let dailyReturn = 0;

function Wallet() {
  const [wallet , setWallet] = useState('')
  const [loading,setLoading]  = useState(false)
  
  //fetch user data
  useEffect(() => {
    const fetchDepositData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const header = {
          token: token,
        };

        const response = await axios.get(
          "http://127.0.0.1:8000/user/auth/get-wallet-details/",
          {
            headers: header,
          }
        );
       
        setWallet(response.data.details)
        // console.log(response);
      } catch (e) {
        // console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDepositData();
  }, []);


  return (
    <>
    {loading ? (
      <div className={`w-full h-full flex justify-center min-h-screen md:min-h-screen items-center ${loading ? 'block' : 'hidden'}`}>
      <div className="w-16 h-16 rounded-full border-t-4 border-blue-500 border-solid animate-spin" />
    </div>
    ) : (
      
    <div className="bg-black md:flex">
      <div className="mx-2 mt-2 md:w-3/5 rounded text-white md:min-h-screen md:pb-0 pb-20 md:px-5 md:py-4 bg-gray-900 ">
      <div className="text-xl md:text-3xl font-extrabold text-white font-georgia flex md:pt-0 pt-6 px-2">
              <span className="text-xl md:text-3xl mr-2 md:mr-2 mt-1">
                <HiOutlineWallet/>
              </span>
              My {" "}
              <span className="text-violet-600 ml-2 md:ml-2"> Wallet</span>
            </div>
        <div className="mx-4  md:mt-10 font-georgia">
          <div className="flex justify-between">
            <div className="text-violet-600">Amount Invested</div>
            <div className="">₹{wallet.amount}</div>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="text-violet-600">Total Packages</div>
            <div className="text-white">{wallet.total_packages}</div>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="text-white">Total Earning</div>
            <div className="text-green-500">+₹{wallet.total_earning}</div>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="text-white">Current Balance</div>
            <div className="text-green-500">₹{wallet.current_balance}</div>
          </div>
          
        </div>
      </div>
      <div className="md:w-2/5 mx-2 md:mx-4 mt-2 md:py-0 py-10 bg-gray-900 md:min-h-screen h-96">
        <div className="flex md:my-20 justify-center">
          
        <Link to="/dash/deposit"><button className="text-white bg-violet-600 shadow-violet-400 rounded-md shadow-inner px-12 py-3">Deposit</button></Link>
          <Link to="/dash/withdraw"><button className="text-violet-500 border-violet-600 bg-gray-800 border-2 rounded-md px-12 shadow-inner  py-3 ml-5">Withdraw</button></Link>
        </div>
        
      </div>
    </div>
    )}
    </>
  );
}

export default Wallet;



