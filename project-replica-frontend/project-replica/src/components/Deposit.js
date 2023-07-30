import React from "react";
import TransactionTable from "./deposit-withdrawl/TransactionTable";
import { useState,useEffect } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
function Deposit() {

  const [formData, setFormData] = useState({
   quantity : '',
   transactionId : '',
  
   });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [payment_address, setPayment_address] = useState("");

  const handleOptionChange = (event) => {
    setPayment_address(event.target.value);
  };


  
  // console.log(list);
  
  
  
  
  

  const [processing, setProcessing] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (processing) return; // Prevent multiple form submissions
    setProcessing(true); // Set processing state to true

    // const data = {list : list , address : formData}
    
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/auth/deposit/",
        
          { "quantity" : formData.quantity,
            "transaction_id" : formData.transactionId,
            "payment_id" : payment_address
          },
      {
         
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        
      );
      console.log(response.data);
      toast.success("Deposit request placed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className : ""
      });
      // if (response.status === 200) {
      //   // Redirect to another page
      //   window.location.href = '/orderplaced';
      // } else {
      //   console.error('Unexpected response status:', response.status);
      // }

      
    } catch (error) {
      console.error("error occured");
      console.error(error);
      toast.error("Deposit request failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className : ""
      });
    }
    setProcessing(false);
    console.log(formData);
  };

  //Fetch Deposit List
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDepositData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const header = {
          token: token,
        };

        const response = await axios.get(
          "http://127.0.0.1:8000/user/auth/get-user-deposit/",
          {
            headers: header,
          }
        );
       
        setTransactions(response.data.transactions)
        console.log(response);
      } catch (e) {
        // console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDepositData();
  }, []);







   
  return (
    <div className="text-white font-opsans text-base md:text-md mx-4 my-5 min-h-screen">
        <div className="font-bold mb-5 text-lg font-sans">Deposit</div>

        

        <div className="text-gray-300 mt-4">
            $100 per package | Enter No of packages | Processing Time: 3 hours
        </div>
      <form className="my-8 md:my-5 md:w-3/5" onSubmit={handleSubmit}>
      <div className="text-white">Coin Payment Addresses: 
        <div className="space-y-2 mt-3 md:ml-2">
            

            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="paymentOption"
                value="TRC"
                checked={payment_address === "TRC"}
                onChange={handleOptionChange}
                required
              />
              <div className="text-white ml-2 md:ml-4 mt-2 md:mt-0">USDT TRC 20: <span className="font-semibold">Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e</span></div>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="paymentOption"
                value="ERC"
                checked={payment_address === "ERC"}
                onChange={handleOptionChange}
                required
              />
              <div className="text-white ml-2 md:ml-4 mt-2 md:mt-0">USDT ERC 20: <span className="font-semibold">Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e</span></div>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="paymentOption"
                value="BSC"
                checked={payment_address === "BSC"}
                onChange={handleOptionChange}
                required
              />
              <div className="text-white ml-2 md:ml-4 mt-2 md:mt-0">USDT BSC: <span className="font-semibold">Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e</span></div>
            </label>

            
          </div>
        
        
        </div>
        <label className="text-black ">
            <div className="flex justify-between mt-5">
                <div className="text-white">No of package <span className="text-red-600">*</span></div>
               
                
            </div>
            <input type="number" value={formData.quantity} name="quantity" onChange={handleChange} min={1} className="w-full mb-5"/>
        </label>
        <div className="text-white mb-5 px-2 py-2 border-2 rounded-sm border-white w-fit">
          Amount to Pay : <span className="font-bold">${formData.quantity*100}</span> 
        </div>
        <label htmlFor="transactionId" className="text-black">
            <span className="text-white">Transaction ID</span><span className="text-red-600">*</span>
            <input type="text" id="transactionId"  name="transactionId" value={formData.transactionId} onChange={handleChange} className="w-full" />
        </label>
        <button type="submit"  className="text-white bg-green-500 shadow-green-400 px-6 md:px-8 rounded-md shadow-inner py-2 md:py-3 my-5">{processing ? "Processing" : "Deposit"}</button>
      </form>

      <div className="">
        <TransactionTable title = {"Deposit"} transactions = {transactions}/>
      </div>
    </div>

  );
}

export default Deposit;
