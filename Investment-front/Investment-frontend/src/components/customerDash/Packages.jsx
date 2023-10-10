import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import {BsCoin} from "react-icons/bs";

function Packages() {
  const [total_earning, setTotal_earning] = useState(null);
  const [current_balance, setCurrent_balance] = useState(null);

  const [transactions, settransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [opendiv, setOpendiv] = useState(false);
  const [quant, seQuant] = useState("");
  const [processing, setProcessing] = useState(false);

  //opendiv onclick
  const handleOnclick = (e) => {
    e.preventDefault();
    setOpendiv(!opendiv);
  };


  const handleOnchange = (e) =>
  {
    seQuant(e.target.value)
    //console.log(e.target.value)
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (processing) return; // Prevent multiple form submissions
    setProcessing(true); // Set processing state to true

    // const data = {list : list , address : formData}
    //console.log(processing)
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/auth/buy-package/",
        
          { "quantity" : quant,
            
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
        className : ""
      });
      

      
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
   
  };


  useEffect(() => {
    const fetchDepositData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const header = {
          token: token,
        };

        const response = await axios.get(
          "http://127.0.0.1:8000/user/auth/get-myPackages/",
          {
            headers: header,
          }
        );

        settransactions(response.data.transactions);
        setCurrent_balance(response.data.current_balance);
        setTotal_earning(response.data.total_earning);
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
        <div
          className={`w-full h-full flex justify-center min-h-screen md:min-h-screen items-center ${
            loading ? "block" : "hidden"
          }`}
        >
          <div className="w-16 h-16 rounded-full border-t-4 border-blue-500 border-solid animate-spin" />
        </div>
      ) : (
        <div className="bg-gray-900 font-opsans min-h-screen md:min-h-screen mx-2 mt-2 px-4 py-4 md:mx-0">
          <div className="md:flex justify-between md:mx-2">
          <div className="text-xl md:text-3xl font-extrabold text-white font-georgia flex md:pt-0 pt-6 px-2">
              <span className="text-xl md:text-3xl mr-2 md:mr-2 mt-1">
                <BsCoin className="text-violet-600"/>
              </span>
              Investment{" "}
              <span className="text-violet-600 ml-2 md:ml-2"> Insights</span>
            </div>
            <div className=" mt-2 md:ml-0 ml-2">
              <div className="text-white font-georgia flex justify-between">
                Total Earning :{" "}
                <span className="text-green-500">₹{total_earning}</span>
              </div>
              <div className="text-white flex font-georgia justify-between">
                Current Balance :{" "}
                <span className="text-green-500 ml-2">₹{current_balance}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4 ">
            <button
              className="md:mx-3 md:mt-0 mt-3 px-3 py-1 text-violet-600 bg-gray-900 border-2 border-violet-600 rounded-md  font-semibold"
              onClick={handleOnclick}
            >
              BUY PACKAGE
            </button>

          </div>
         

          {opendiv && (<>
              <form className="text-black mt-5" onSubmit={handleOnSubmit}>
              <div className="text-white font-georgia mt-4 md:text-2xl text-lg">Compounding Corner</div>
              <label className="text-black ">
            <div className="flex justify-between mt-5">
              
                <div className="text-white font-georgia">No. of packages (Current Balance must be above ₹500) <span className="text-red-600">*</span></div>
               
                
            </div>
            <input type="number" value={quant} name="quantity" onChange={handleOnchange} min={1} max={current_balance/500} className="w-full mb-5  md:w-1/2 h-10 focus:outline-none focus:ring-0 focus:border-violet-600 rounded-md focus:border-2 bg-slate-800 border-slate-500 text-white font-georgia px-2"/>
        </label>
        <div className="text-white font-georgia mb-5 px-2 py-2 border-2 rounded-sm border-violet-600 w-fit">
          Amount : <span className="font-bold">₹{quant*500}</span> 
        </div>
        <button type="submit" value="Submit"  className="mt-3 px-3 py-1 bg-violet-600 rounded-md text-white font-georgia font-bold" >{processing ? "Processing" : "SUBMIT"}</button>
              </form>
              
            </>)}

          <div className="overflow-x-auto mt-10">
            <table className="min-w-full font-georgia border-2 text-sm md:text-md text-white  border-violet-600 bg-gray-900">
              <thead className="">
                <tr>
                  <th className="py-2 px-4 border-b-2 border-violet-600 text-left">
                    Sl.{" "}
                  </th>
                  <th className="py-2 px-4 border-b-2 border-violet-600 text-left">
                    Date
                  </th>
                  <th className="py-2 px-4 border-b-2 border-violet-600 text-left">
                    Quantity
                  </th>
                  <th className="py-2 px-4 border-b-2 border-violet-600 text-left">
                    Amount
                  </th>
                  <th className="py-2 px-4 border-b-2 border-violet-600 text-left">
                    Profit
                  </th>
                  <th className="py-2 px-4 border-b-2 border-violet-600 text-left">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 && (
                  <td className="" colSpan="6">
                    <div className="py-2 px-4 flex justify-center">
                      List is Empty
                    </div>
                  </td>
                )}
                {transactions &&
                  transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b-2 border-violet-600">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border-b-2 border-violet-600">
                        {transaction.date}
                      </td>
                      <td className="py-2 px-4 border-b-2 border-violet-600">
                        {transaction.quantity}
                      </td>
                      <td className="py-2 px-4 border-b-2 border-violet-600">
                      ₹{transaction.quantity * 500.0}
                      </td>
                      <th className="py-2 px-4 border-b-2 border-violet-600 text-left text-violet-600">
                      ₹{transaction.profit}
                      </th>
                      <td
                        className={`py-2 px-4 border-b-2 border-violet-600  ${
                          transaction.status === "Expired"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {transaction.status}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Packages;
