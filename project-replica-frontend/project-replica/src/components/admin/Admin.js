import React from "react";
import Adeposit from "./deposit/Adeposit";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Admin = () => {
  // const transactions = [
  //   { id: 1, amount: 1000, status: 'Pending' },
  //   { id: 2, amount: 2000, status: 'Approved' },
  //   { id: 3, amount: 3000, status: 'Pending' },
  // ];

  const [transactions, settransactions] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);


  const [page,setPage] = useState('deposit');


  const handlepageDeposit = () =>
  {
    setPage('deposit');
  }
  const handlepageWithdraw = () =>
  {
    setPage('withdraw');
  }

 
  useEffect(() => {
    const fetchDepositData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const header = {
          token: token,
        };

        const response = await axios.get(
          "http://127.0.0.1:8000/adminpanel/get_admin_deposit/",
          {
            headers: header,
          }
        );
        // console.log(response.data.meds)

        // console.log(list1);
        // console.log(date);

        // console.log(meds)
        settransactions(response.data.transactions);
        setWithdrawals(response.data.withdrawals);
        console.log(response.data);
      } catch (e) {
        // console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDepositData();
  }, []);



  console.log(loading);

  //  const [processing, setProcessing] = useState(false);
  const handleDeposit = async (transactionId) => {
    // Logic to handle the approval action

    if (loading) return; // Prevent multiple form submissions
    setLoading(true); // Set processing state to true

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/adminpanel/approve_deposit/",

        {
          id: transactionId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.success, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className: "",
      });
      
     if (response.status === 200) {
        // Redirect to another page
        window.location.href = '/adminpanel';
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error("error occured");
      console.error(error);
      toast.error("Approve Failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className: "",
      });
    }
    setLoading(false);
    // console.log(formData);
  };




  const handleWithdraw = async (transactionId) => {
    // Logic to handle the approval action

    if (loading) return; // Prevent multiple form submissions
    setLoading(true); // Set processing state to true

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/adminpanel/approve_withdraw/",

        {
          id: transactionId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.success, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className: "",
      });
      
     if (response.status === 200) {
        // Redirect to another page
        window.location.href = '/adminpanel';
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error("error occured");
      console.error(error);
      toast.error("Approve Failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className: "",
      });
    }
    setLoading(false);
    // console.log(formData);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen text-3xl text-black">
          Loading...
        </div>
      ) : (
        <div className="mt-32">
          <div className="flex  justify-center mt-2">
            <button className="  bg-green-500 shadow-green-400 rounded-md shadow-inner px-12 py-3" onClick={handlepageDeposit}>Deposit</button>
            <button className=" bg-red-500 rounded-md px-12 shadow-inner shadow-red-400 py-3 ml-5" onClick={handlepageWithdraw}>Withdraw</button>
          </div>
          {page === 'deposit' && (
            <>
            <h1>Deposit Transactions</h1>
          <Adeposit transactions={transactions} onApprove={handleDeposit} page = {'deposit'}/>
            </>
          ) }
          {
            page === 'withdraw' && (
              <>
              <h1>Withdrawal Transactions</h1>
          <Adeposit transactions={withdrawals} page = {'withdraw'} onApprove={handleWithdraw}/>
              </>
            )
          }
        </div>
      )}
    </>
  );
};

export default Admin;
