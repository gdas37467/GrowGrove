import ReferralTable from "../referraltable/ReferralTable";
import { useEffect, useState } from "react";
import { FaHandshakeSimple } from "react-icons/fa6";
import axios from "axios";
import { FaUsers } from "react-icons/fa6";
import { HiOutlineUsers  } from "react-icons/hi2";

function Referral() {
  // const [total_earning, setTotal_earning] = useState(null);
  // const [current_balance , setCurrent_balance] = useState(null);

  const [level1, setLevel1] = useState([]);
  const [level2, setLevel2] = useState([]);
  const [loading, setLoading] = useState({});
  const [bonus, setBonus] = useState(null);
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
        setBonus(response.data.bonusObj);

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
          <div className="md:flex justify-between md:mr-2">
            <div className="text-xl md:text-3xl font-extrabold text-white font-georgia flex md:pt-0 pt-6 px-2">
              <span className="text-xl md:text-3xl mr-2 md:mr-2 mt-1">
                <FaHandshakeSimple />
              </span>
              Your Referral{" "}
              <span className="text-violet-600 ml-2 md:ml-2"> Network</span>
            </div>
            
          </div>
          <div className="text-lg md:text-2xl font-georgia text-white mt-5 px-2">
            Refer and Earn
          </div>
          <div className="text-md md:text-xl text-gray-400 font-georgia mt-2 px-2 md:pr-52 md:pl-2">
            You earn a bonus of 10% for every package purchase made by your
            Level 1 referrals and 5% for every package purchase made by your
            Level 2 referrals.
          </div>
          <div className="text-lg md:text-2xl font-georgia text-white mt-5 px-2">
            Your Referral Rewards
          </div>
          <div className="text-md md:text-xl text-gray-400 font-georgia mt-2 px-2 md:pr-52 md:pl-2">
          Total Bonus from Level 1 Referrals: <span className="text-green-500">₹{bonus.l1bonus}</span>
          </div>
          <div className="text-md md:text-xl text-gray-400 font-georgia mt-1 px-2 md:pr-52 md:pl-2">
          Total Bonus from Level 2 Referrals: <span className="text-green-500">₹{bonus.l2bonus}</span>
          </div>
          <div>
            <ReferralTable title={"Level 1"} level={level1} icon={<HiOutlineUsers className="text-violet-600"/>} />
          </div>

          <div>
            <ReferralTable title={"Level 2 "} level={level2} icon= { <FaUsers className="text-violet-600"/>}/>
          </div>
        </div>
      )}
    </>
  );
}

export default Referral;
