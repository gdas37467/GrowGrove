import TransactionTable from "./deposit-withdrawl/TransactionTable";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CopyToClipboardButton from "./CopyToClipboardButton";
function Deposit() {
  

  const [formData, setFormData] = useState({
    quantity: "",
    transactionId: "",
    
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

        {
          quantity: formData.quantity,
          transaction_id: formData.transactionId,
          payment_id: payment_address,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
     // console.log(response.data);
      toast.success("Deposit request placed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className: "",
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
        className: "",
      });
    }
    setProcessing(false);
    //console.log(formData);
  };

  //Fetch Deposit List
  const [transactions, setTransactions] = useState([]);
  // eslint-disable-next-line
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

        setTransactions(response.data.transactions);
        //console.log(response);
      } catch (e) {
        // console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDepositData();
  }, []);

  return (
    <div className="text-white font-georgia text-base md:text-md mx-4 my-5 min-h-screen">
      <div className="font-bold mb-5 text-xl md:text-3xl font-georgia">Deposit</div>

      <div className="text-gray-400  mt-4">
      ₹500 per package | Enter No of packages | Processing Time: 8-9 hours
      </div>
      <form className="my-8 md:my-5 md:w-3/5" onSubmit={handleSubmit}>
        <div className="text-white md:text-md">
          <div className="md:text-lg"> Payment Addresses:</div>
          <div className="space-y-2 mt-3 md:ml-2">
            
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio accent-violet-600"
                name="paymentOption"
                value="TRC"
                checked={payment_address === "TRC"}
                onChange={handleOptionChange}
                required
              />
              <div className="text-white ml-2 md:ml-4 mt-2 md:mt-0 max-w-full overflow-hidden break-all">
                UPI ID:{" "}
                <span className="flex">
                  {" "}
                  <span className={`${payment_address === "TRC" ? 'text-violet-600' : "text-white"} `}>
                    {"apc@oksvi.com"}
                  </span>{" "}
                  <span className="ml-3 mt-1">
                    <CopyToClipboardButton
                      text={"apc@oksvi.com"}
                    />{" "}
                  </span>
                </span>
              </div>
            </label>
            
          </div>
        </div>
        <label className="text-black font-georgia">
          <div className="flex justify-between mt-5">
            <div className="text-white mb-2 font-georgia">
              No of package <span className="text-red-600">*</span>
            </div>
          </div>
          <input
            type="number"
            value={formData.quantity}
            name="quantity"
            onChange={handleChange}
            min={1}
            className="w-full md:w-1/2 h-10 mb-5 focus:outline-none focus:ring-0 focus:border-violet-600 rounded-md focus:border-2 bg-slate-800 border-slate-500 text-white font-georgia px-2"
            required
          />
        </label>
        <div className="text-white mb-5 px-2 py-2 border-2 rounded-sm border-violet-600 w-fit font-georgia">
          Amount to Pay :{" "}
          <span className="font-bold text-violet-600">₹{formData.quantity * 500}</span>
        </div>
        <label htmlFor="transactionId " className="text-black">
          <div className="text-white mb-2 font-georgia">Transaction ID<span className="text-red-600">*</span>(Complete the Deposit process within Two minutes)</div>
          
          <input
            type="text"
            id="transactionId"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            className="w-full md:w-1/2 h-10 focus:outline-none focus:ring-0 focus:border-violet-600 rounded-md focus:border-2 bg-slate-800 border-slate-500 text-white font-georgia px-2"
            required
          />
        </label>
        <div>

        
        <button
          type="submit"
          className="text-white bg-violet-600 shadow-violet-400  px-6 md:px-8 rounded-md shadow-inner py-2 md:py-3 my-5"
        >
          {processing ? "Processing" : "Deposit"}
        </button>

        </div>
      </form>

      <div className="">
        <TransactionTable title={"Deposit"} transactions={transactions} />
      </div>
    </div>
  );
}

export default Deposit;
