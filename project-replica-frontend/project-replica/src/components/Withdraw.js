import React from "react";
import TransactionTable from "./deposit-withdrawl/TransactionTable";
import { useState ,useEffect} from "react";
import {toast} from "react-toastify";
import axios from "axios";

function Withdraw() {
  const [formData, setFormData] = useState({
    amount : '',
    remarks : '',
   
    });
 
   const handleChange = (event) => {
     const { name, value } = event.target;
     setFormData({ ...formData, [name]: value });
   };
   
   // Import Current Balance from Database , for assigning Max limit for withdraw
  

   //HandleSubmit Function

   const [processing, setProcessing] = useState(false);
   const [transactions, setTransactions] = useState([]);
   const handleSubmit = async (event) => {
    event.preventDefault();
    if (processing) return; // Prevent multiple form submissions
    setProcessing(true); // Set processing state to true

    // const data = {list : list , address : formData}
    
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/auth/withdraw/",
        
          { "amount" : formData.amount
          },
      {
         
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        
      );
      console.log(response.data);
      


      toast.success("Withdraw request placed", {
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

//To get Withdrawal Request List
const [loading, setLoading] = useState(false);
const [currentbalance,setCurrentbalance]  =  useState('');
  useEffect(() => {
    const fetchDepositData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const header = {
          token: token,
        };

        const response = await axios.get(
          "http://127.0.0.1:8000/user/auth/get-user-withdraw/",
          {
            headers: header,
          }
        );
       
        setTransactions(response.data.transactions)
        setCurrentbalance(response.data.current_balance)
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
    <div className="text-white font-opsans text-base md:text-md mx-4 my-5 ">
        <div className="font-bold mb-5 text-lg font-sans">Withdrawal</div>

        <div className="text-gray-300">Your Wallet Address: <span className="md:ml-3 ml-2">Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e</span></div>

        <div className="text-gray-300 mt-4">
            Minimum $50 per transaction | No Max limit | Fee(inclusive of all taxes) : $4 per transaction | Processing Time: 24 hours
        </div>
      <form className="my-8 md:my-5 md:w-3/5" onSubmit={handleSubmit}>
        
        <label className="text-black">
            <div className="flex justify-between text-white">
                <div className="">USDT Amount</div>
                <div>Available Balance: ${currentbalance}</div>
                
            </div>
            <input type="number" name="amount" value={formData.amount} max={currentbalance}  className="w-full mb-5" onChange={handleChange}/>
        </label>
        <div className="text-white mb-0 px-2 py-2 border-2 rounded-sm border-white w-fit">
          Amount you get : <span className="font-bold">${formData.amount - 4 < 0? 0 : formData.amount -4}</span> 
        </div>
        <label className="text-black">
            Remarks
            <input type="text" name="remarks" className="w-full" value={formData.remarks} onChange={handleChange}/>
        </label>
        <button type="submit" value="Withdraw" className="text-white bg-red-500 rounded-md px-6 md:px-8 shadow-inner shadow-red-400 py-2 md:py-3 my-5" >{processing ? "Processing" : "Withdraw"}</button>
      </form>

      <div className="">
        <TransactionTable title={"Withdrawal"} transactions = {transactions}/>
      </div>
    </div>

  );
}

export default Withdraw;
