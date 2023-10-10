import React from 'react';
import { Routes ,Route } from 'react-router-dom';

import Sidebar from './Sidebar';
import Profile from './Profile';
import Wallet from './Wallet';
import Referral from './Referral';
import Withdraw from '../Withdraw';
import Deposit from '../Deposit';
import Packages from './Packages';
import './style.css';
import TwoFA from './TwoFA';



const Dashboard = () => {
  

  return (
    <div className="md:flex md:min-h-screen bg-black mt-28">
      <Sidebar />
      <div className="md:w-3/4 md:min-h-screen bg-black">
        <Routes >
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/wallet" element={<Wallet/>} />
          <Route exact path="/referral" element={<Referral/>} />
          <Route exact path="/withdraw" element={<Withdraw/>}/>
          <Route exact path="/deposit" element={<Deposit/>}/>
          <Route exact path="/packages" element={<Packages/>}/>
          <Route exact path="/two-fa" element={<TwoFA/>}/>
      
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;