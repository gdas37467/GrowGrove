import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

let amountInvested = 0;
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
      <div className="mx-2 mt-2 md:w-3/5 rounded text-white md:min-h-screen md:pb-0 pb-20 bg-gray-800 ">
        <div className="font-opsans px-10 pt-10 pb-5 md:p-10 text-lg">Balances</div>
        <div className="mx-10 mt-1 md:mt-6">
          <div className="flex justify-between">
            <div className="text-white">Amount Invested</div>
            <div className="">${wallet.amount}</div>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="text-white">Total Earning</div>
            <div className="text-green-500">+${wallet.total_earning}</div>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="text-white">Current Balance</div>
            <div className="text-green-500">${wallet.current_balance}</div>
          </div>
        </div>
      </div>
      <div className="md:w-2/5 mx-2 mt-2 md:py-0 py-10 bg-gray-800 md:min-h-screen h-96">
        <div className="flex md:my-20 justify-center">
          
        <Link to="/dash/deposit"><button className="text-white bg-green-500 shadow-green-400 rounded-md shadow-inner px-12 py-3">Deposit</button></Link>
          <Link to="/dash/withdraw"><button className="text-white bg-red-500 rounded-md px-12 shadow-inner shadow-red-400 py-3 ml-5">Withdraw</button></Link>
        </div>
        <div className="text-white mt-10 md:mt-24 ml-8">
          <div>Wallet Deposit Address</div>
          <div className="mt-5 md:mt-10 mb-4 md:mb-5">Deposits to this address are unlimited. </div>
          <span className="border-2  border-white p-2 md:p-2 rounded-md">Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e</span>
        </div>
      </div>
    </div>
    )}
    </>
  );
}

export default Wallet;



