import React from "react";
import Adeposit from "./deposit/Adeposit";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import  {useNavigate}  from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Admin = () => {


  const [transactions, settransactions] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
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

    // if(!!localStorage.getItem("superUser"))
    // {
    //   localStorage.removeItem("superUser");
    //   localStorage.removeItem("token");
    // }

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
       // console.log(response.data);
      } catch (e) {
        // console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDepositData();
  }, []);



  

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
     // console.log(response.data);
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

  
  //Decline Deposit Request

  const handleDeclineDeposit = async (transactionId) => {
    // Logic to handle the approval action

    if (loading) return; // Prevent multiple form submissions
    setLoading(true); // Set processing state to true

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/adminpanel/decline-deposit/",

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
     // console.log(response.data);
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
      toast.error("Decline Failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className: "",
      });
    }
    setLoading(false);
    
  };


  //Decline Withdraw Request

  const handleDeclineWithdraw = async (transactionId) => {
    // Logic to handle the approval action

    if (loading) return; // Prevent multiple form submissions
    setLoading(true); // Set processing state to true

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/adminpanel/decline-withdraw/",

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
     // console.log(response.data);
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
      
      toast.error("Decline Failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Duration in milliseconds
        className: "",
      });
    }
    setLoading(false);
    
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
     // console.log(response.data);
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

 //Logout Function
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    // remove jwt token
    localStorage.removeItem("token");
    localStorage.removeItem("superUser");

    localStorage.removeItem("lik_rt_ad_loksminis")
    navigate("/sign-in");

    // Display success toast notification
    toast.success("Logout successful!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Duration in milliseconds
    });
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen text-3xl text-black">
          Loading...
        </div>
      ) : (
        <div className="mt-32">
          <div className="flex md:flex-row flex-col md:justify-center mt-2 md:mx-0 mx-5">
            <button className="  bg-green-500 shadow-green-400 rounded-md shadow-inner px-2 md:px-12 py-3" onClick={handlepageDeposit}>Deposit</button>
            <button className=" bg-red-500 rounded-md  shadow-inner px-2 md:px-12 shadow-red-400 py-3 md:ml-5 mt-5 md:mt-0" onClick={handlepageWithdraw}>Withdraw</button>
            <button
              className="px-2 md:px-12 py-3 flex bg-sky-500 rounded-md text-white font-semibold md:ml-5 mt-5 md:mt-0 md:mr-0 mr-64"
              onClick={handleLogout}
            >
              <span className="mr-2 mt-1">
                <FiLogOut />
              </span>
              LOGOUT
            </button>
          
          </div>
          {page === 'deposit' && (
            <>
            <h1 className="md:ml-5 ml-2 mt-10">Deposit Transactions</h1>
          <Adeposit transactions={transactions} onApprove={handleDeposit} page = {'deposit'}  onDecline = {handleDeclineDeposit}/>
            </>
          ) }
          {
            page === 'withdraw' && (
              <>
              <h1 className="md:ml-5 ml-2 mt-10">Withdrawal Transactions</h1>
          <Adeposit transactions={withdrawals} page = {'withdraw'} onApprove={handleWithdraw} onDecline = {handleDeclineWithdraw}/>
              </>
            )
          }
        </div>
      )}
    </>
  );
};

export default Admin;
