import React from "react";
import ReferralTable from "../referraltable/ReferralTable";

function Referral() {
  return (
    <div className="bg-gray-900 font-opsans min-h-screen md:min-h-screen mx-2 mt-2 px-4 py-4 md:mx-0">
      <div className="md:text-xl font-bold text-white">Level 1 Referral Scheme</div>
      <div className="text-gray-300 py-4 md:w-2/4">
        <div className="flex justify-between">
          <div>Bronze</div>
          <div>10% direct bonus on each package</div>
        </div>
        <div className="flex justify-between">
          <div>Silver</div>
          <div>12.5% direct bonus on each package</div>
        </div>
        <div className="flex justify-between">
          <div>Gold</div>
          <div>15% direct bonus on each package</div>
        </div>
        <div className="flex justify-between">
          <div>Diamond</div>
          <div>17% direct bonus on each package</div>
        </div>
        <div className="flex justify-between">
          <div>VIP</div>
          <div>20% direct bonus on each package</div>
        </div>
      </div>
      <div>
        <ReferralTable title={"Level 1 "}/>
      </div>
      <div className="md:text-xl font-bold text-white mt-4">Level 2 Referral Scheme</div>
      <div className="text-gray-300 py-4 md:w-2/4">
      4% bonus on every package purchase
      </div>
      <div>
      <ReferralTable title={"Level 2 "}/>
      </div>

    </div>
  );
}

export default Referral;
