import React from "react";
import ReferralTable from "../referraltable/ReferralTable";
import { useEffect,useState } from "react";
import axios from "axios";

function Referral() {

  // const [total_earning, setTotal_earning] = useState(null);
  // const [current_balance , setCurrent_balance] = useState(null);

    const [level1, setLevel1] = useState([]);
    const [level2, setLevel2] = useState([]);
    const [loading, setLoading] = useState({});
    const [bonus , setBonus] = useState(null);
    // const [empty, setEmpty] = useState(false);
  
    useEffect(() => {
      const fetchDepositData = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          const header = {
            token: token,
          };
  
          const response = await axios.get(
            "http://127.0.0.1:8000/user/auth/get-referrals/",
            {
              headers: header,
            }
          );
         
          setLevel1(response.data.level1);
          setLevel2(response.data.level2);
          setBonus(response.data.bonusObj)
         
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
    <>
    {loading ? (
        <div className={`w-full h-full flex justify-center min-h-screen md:min-h-screen items-center ${loading ? 'block' : 'hidden'}`}>
        <div className="w-16 h-16 rounded-full border-t-4 border-blue-500 border-solid animate-spin" />
      </div>
      ) : (
    <div className="bg-gray-900 font-opsans min-h-screen md:min-h-screen mx-2 mt-2 px-4 py-4 md:mx-0">
      <div className="md:flex justify-between md:mr-2">
      <div className="text-3xl font-extrabold text-white md:ml-0 ml-2">
              Referral Scheme
            </div>
            <div className=" mt-2 md:ml-0 ml-2">
              <div className="text-white flex justify-between">
                Total Bonus :{" "}
                <span className="text-green-500">${bonus.total_bonus}</span>
              </div>
              <div className="text-white flex justify-between">
                Level1 Bonus :{" "}
                <span className="text-green-500 ml-2">${bonus.l1bonus}</span>
              </div>
              <div className="text-white flex justify-between">
                Level2 Bonus :{" "}
                <span className="text-green-500 ml-2">${bonus.l2bonus}</span>
              </div>
            </div>
            </div>
      <div className="md:text-xl font-bold text-white mt-5">Level 1 Referral Scheme</div>
      <div className="text-gray-300 py-4 md:w-2/4">
       $10 per monnth on every package purchase
      </div>
      <div>
        <ReferralTable title={"Level 1 "} level = {level1}/>
      </div>
      <div className="md:text-xl font-bold text-white mt-4">Level 2 Referral Scheme</div>
      <div className="text-gray-300 py-4 md:w-2/4">
      $5 bonus per month on every package purchase
      </div>
      <div>
      <ReferralTable title={"Level 2 "} level = {level2}/>
      </div>

    </div>
      )}
    </>
  );
}

export default Referral;
