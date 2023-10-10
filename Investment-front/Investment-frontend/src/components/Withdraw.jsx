
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
      //console.log(response.data);
      


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
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className : ""
      });
    }
    setProcessing(false);
   // console.log(formData);
  };

//To get Withdrawal Request List
const [loading, setLoading] = useState(false);
const [currentbalance,setCurrentbalance]  =  useState('');
const [walletAddress,setWalletAddress]  =  useState('');
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
        setWalletAddress(response.data.walletAddress)

        //console.log(response);
      } catch (e) {
        // console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDepositData();
  }, []);











  return (<>
  {loading ? (
        <div
          className={`w-full h-full flex justify-center min-h-screen md:min-h-screen items-center ${
            loading ? "block" : "hidden"
          }`}
        >
          <div className="w-16 h-16 rounded-full border-t-4 border-blue-500 border-solid animate-spin" />
        </div>
      ) : (
  
    <div className="text-white font-georgia text-base md:text-lg mx-4 my-5 ">
        
        <div className="font-bold mb-5 text-xl md:text-3xl font-georgia">Withdrawal</div>

        <div className="text-gray-400 ">Your Wallet Address: <span className="md:ml-3 ml-2">{walletAddress}</span></div>

        <div className="text-gray-400  mt-1">
            Minimum ₹50 per transaction | No Max limit | Fee(inclusive of all taxes) : ₹4 per transaction | Processing Time: 8-9 hours
        </div>
      <form className="my-8 md:my-5 md:w-3/5" onSubmit={handleSubmit}>
        
        <label className="text-black">
            <div className="flex md:w-1/2 justify-between text-white">
                <div className="">Amount</div>
                <div>Available Balance: <span className="text-violet-600">₹{currentbalance}</span></div>
                
            </div>
            <input type="number" name="amount" value={formData.amount} max={currentbalance} min={50}  className="w-full md:w-1/2 h-10 mb-5 focus:outline-none focus:ring-0 focus:border-violet-600 rounded-md focus:border-2 bg-slate-800 border-slate-500 text-white font-georgia px-2" onChange={handleChange}/>
        </label>
        <div className="text-white mb-0 px-2 py-2 border-2 rounded-sm border-violet-600 w-fit">
          Amount you get : <span className="font-bold text-violet-600">${formData.amount - 4 < 0? 0 : formData.amount -4}</span> 
        </div>
        <label className="text-black ">
            <div className="text-white mt-3">Remarks</div>
            <input type="text" name="remarks" className="w-full md:w-1/2 h-10 focus:outline-none focus:ring-0 focus:border-violet-600 rounded-md focus:border-2 bg-slate-800 border-slate-500 text-white font-georgia px-2" value={formData.remarks} onChange={handleChange}/>
        </label>
        <div>
        <button type="submit" value="Withdraw" className="text-violet-600 border-violet-600 bg-gray-800 border-2 rounded-md px-6 md:px-8 shadow-inner py-2 md:py-3 my-5" >{processing ? "Processing" : "Withdraw"}</button>
        </div>
        
      </form>

      <div className="">
        <TransactionTable title={"Withdrawal"} transactions = {transactions}/>
      </div>
    </div>)}
    </>

  );
}

export default Withdraw;
