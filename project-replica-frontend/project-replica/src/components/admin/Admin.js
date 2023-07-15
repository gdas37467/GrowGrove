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
        console.log(response.data.transactions);
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
  const handleApprove = async (transactionId) => {
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

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen text-3xl text-black">
          Loading...
        </div>
      ) : (
        <div className="mt-32">
          <h1>Deposit Transactions</h1>
          <Adeposit transactions={transactions} onApprove={handleApprove} />
        </div>
      )}
    </>
  );
};

export default Admin;
