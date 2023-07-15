import React from "react";
import TransactionTable from "./deposit-withdrawl/TransactionTable";

function Withdraw() {
  return (
    <div className="text-white font-opsans text-base md:text-md mx-4 my-5 ">
        <div className="font-bold mb-5 text-lg font-sans">Withdrawal</div>

        <div className="text-gray-300">Your Wallet Address: <span className="md:ml-3 ml-2">Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e</span></div>

        <div className="text-gray-300 mt-4">
            Minimum $50 per transaction | No Max limit | Fee(inclusive of all taxes) : $4 per transaction | Processing Time: 24 hours
        </div>
      <form className="my-8 md:my-5 md:w-3/5">
        
        <label>
            <div className="flex justify-between">
                <div className="">USDT Amount</div>
                <div>Available Balance: {25.08}</div>
                
            </div>
            <input type="text" name="amount" className="w-full mb-5"/>
        </label>
        <label>
            Remarks
            <input type="text" name="remarks" className="w-full"/>
        </label>
        <input type="submit" value="Withdraw" className="text-white bg-red-500 rounded-md px-6 md:px-8 shadow-inner shadow-red-400 py-2 md:py-3 my-5" />
      </form>

      <div className="">
        <TransactionTable title={"Withdrawal"}/>
      </div>
    </div>

  );
}

export default Withdraw;
