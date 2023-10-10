import tim from "../rename.jpeg";
import image from "./16593.png";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaUsers, FaHeadset, FaMoneyCheck } from "react-icons/fa";
import {
  AiOutlineDollarCircle,
  AiOutlineWallet,
  AiOutlineFundProjectionScreen,
} from "react-icons/ai";
import {
  BiDollar,
  BiCoinStack,
  BiUserVoice,
  BiPackage,
  BiCalendar,
  BiArrowToRight,
} from "react-icons/bi";
import { BsCalendar, BsTag } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";

function Homepage() {
  return (
    <>
      <div className="md:w-full h-screen  relative mt-30 md:mt-24 ">
        <div
          className="w-full h-full md:bg-cover bg-cover bg-fixed bg-no-repeat "
          style={{ backgroundImage: `url(${tim})` }}
        ></div>

        <div className="absolute bg-purple-800 bg-opacity-60 md:w-2/5 w-11/12 mx-4  z-10 top-0 h-full">
          <div className="md:m-20 mt-40 md:text-6xl ml-3 text-4xl font-opsans text-white">
            <div className="font-georgia">
              <span className="font-extrabold font-georgia">EASY</span> 
            </div>

            <div className="font-extrabold mt-2 font-georgia"> </div>
            <div className="mt-2 font-georgia">FAST </div>
            <div className="mt-2 font-georgia">& RELIABLE</div>
          </div>
          <div className="font-georgia text-white md:mx-20 mt-10 mx-3 md:text-xl text-lg">
          "Unlock Your Financial Freedom with Mutual Funds. Sign Up for a Fully Automated Account Today."
          </div>
        </div>
      </div>
      <div className="mt-16 mb-20">
        <div className="md:flex block bg-white">
          <div className="md:w-2/5 order-1 md:order-2 border-l-violet-600 md:border-l-2 pb-4 bg-white bg-opacity-60">
            <div className="md:pl-28 px-16 pt-10 md:pt-20 md:pr-4 text-4xl text-gray-900 md:text-6xl font-bold font-georgia">
              Facilities that we{" "}
              <span className="font-normal text-violet-600">provide</span>
            </div>
            <div className="md:mt-10 mt-8 px-2 md:ml-10">
              <img src={image} alt="" />
            </div>
          </div>

          <div className="md:w-3/5 order-2 md:order-1 bg-white">
            <div className="mx-12 md:mx-0 md:ml-24 md:w-1/2 md:mt-20">
              <div className="md:text-xl text-lg ml-2 font-georgia text-gray-900 mb-1 flex">
                {" "}
                <span className=" mb-1">
                  <RiMoneyDollarCircleLine className="w-8 h-8 text-violet-600 mr-2" />
                </span>{" "}
                Affiliate Alchemists
              </div>
              <div className="text-gray-500 md:text-md font-georgia pl-2 mt-2 mx-1 md:mx-3 ">
                Earn commissions through affiliate marketing and forming
                successful partnerships. By sharing our platform with others you
                can earn profits as you build teams and collect a{" "}
                <span className="text-violet-600">percentage of all fees.</span>
              </div>

              <div className=" md:mx-0 md:mr-12  mt-10">
                <div className="text-lg md:text-xl ml-2 md:mx-0 font-georgia text-gray-900 mb-1 flex">
                  {" "}
                  <span className=" mb-1">
                    <FaUsers className="w-8 h-8 mr-2 text-violet-600" />
                  </span>{" "}
                  Trading Titans
                </div>
                <div className="text-gray-500 md:text-md font-georgia pl-2 mt-2 mx-0 md:mx-3 ">
                  Join forces with our team of trusted experts who have served
                  thousands of clients worldwide. We're fast, reliable, and
                  ready to handle your investments. Sit back, relax, and let our
                  group of 5 International Traders{" "}
                  <span className="text-violet-600">work with your funds.</span>
                </div>
              </div>
            </div>

            <div className="mx-12 md:ml-24 md:w-1/2 mt-10">
              <div className="text-lg md:text-xl ml-2 md:mx-0 text-gray-900 font-georgia mb-1 flex">
                {" "}
                <span className=" mb-1">
                  <AiOutlineDollarCircle className="w-8 h-8 mr-2 text-violet-600" />
                </span>{" "}
                Zero Barriers
              </div>
              <div className="text-gray-500 md:text-md font-georgia pl-2 mt-2 md:mx-3">
                Start trading instantly with ZERO deposit fees. There are no
                barriers to entry – open and fund your account without
                <span className="text-violet-600"> additional costs.</span>
              </div>
            </div>
            <div className="mx-12  mt-10 md:ml-24 md:w-1/2">
              <div className="text-lg md:text-xl ml-2 md:mx-0 text-gray-900 font-georgia mb-1 flex">
                {" "}
                <span className=" mb-1">
                  <FaHeadset className="w-8 h-8 mr-2 text-violet-600" />
                </span>{" "}
                Always at Your Service
              </div>
              <div className="text-gray-500 md:text-md font-georgia pl-2 mt-2 md:mx-3">
                We're here for you 24/7. Chat with us online or send us an email
                for quick responses to your inquiries. Our commitment is to
                provide top-notch customer service{" "}
                <span className="text-violet-600">whenever you need it.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="md:mt-10 mt-5 mb-10 md:mb-20 ml-12 mr-5 md:mx-24 md:px-0">
        <div className="font-bold text-3xl md:text-5xl font-georgia md:flex justify-center">
          {" "}
          Mega <span className="text-violet-600 mx-1 md:mx-3"> Deal </span> Delight
        </div>
        <div className=" md:flex text-base md:justify-center font-bold  md:text-2xl mt-3 font-georgia md:mt-3 ">
          Grab a <span className="text-violet-600 md:mx-2">10%</span> Bonus Package
          for <span className="text-violet-600 md:mx-2">FREE</span> when you invest
          over 20,000 USDT! Contact our Customer Service to Claim this Exclusive Offer!
        </div>
       
      </div> */}

      <div className="md:mt-16 mt-5 mb-10 md:mb-20 ml-12 mr-5 md:mx-24 md:px-0 ">
        <div className="md:text-left text-4xl font-bold  md:text-6xl font-georgia">
          Our Business <span className="text-violet-600"> Blueprint</span>
        </div>
        <div className="md:flex md:mt-20">
          <div className="md:w-1/2 ">
            <div className="  font-georgia text-black text-lg md:text-2xl  md:mt-0 mt-10 md:mx-2">
              <div className="flex">
                <span className="text-violet-600">
                  <BiDollar className="mt-1 text-lg md:text-2xl mr-2 font-bold" />
                </span>{" "}
                Interest Rate
              </div>

              <div className="md:text-lg text-base text-gray-900 px-2">
                1.5% daily Interest (7 days in a week)
              </div>
            </div>

            <div className="font-georgia text-black text-lg md:text-2xl  mt-10 md:mx-2">
              <div className="flex">
                <span className="text-violet-600">
                  <BiCalendar className="mt-1 text-lg md:text-2xl mr-2 font-bold" />
                </span>{" "}
                Package Expiry
              </div>
              <div className="md:text-lg text-base text-gray-900 px-2">
                Package will expire after 5x of principal investment
              </div>
            </div>

            <div className="font-georgia text-black text-lg md:text-2xl  mt-10 md:mx-2">
              <div className="flex">
                <span className="text-violet-600">
                  <BiCoinStack className="mt-1 text-lg md:text-2xl mr-2 font-bold" />
                </span>{" "}
                Minimum/Maximum Deposit
              </div>
              <div className="md:text-lg text-base text-gray-900 px-2">
              ₹500 /Unlimited
              </div>
            </div>
            <div className="font-georgia text-black text-lg md:text-2xl  mt-10 md:mx-2">
              <div className="flex">
                <span className="text-violet-600">
                  <AiOutlineWallet className="mt-1 text-lg md:text-2xl mr-2 font-bold" />
                </span>{" "}
                Minimum/Maximum Withdrawal
              </div>
              <div className="md:text-lg text-base text-gray-900 px-2">
              ₹50 /Unlimited
              </div>
            </div>
            <div className="font-georgia text-black text-lg md:text-2xl  mt-10 md:mx-2">
              <div className="flex">
                <span className="text-violet-600">
                  <BsTag className="mt-1 text-lg md:text-2xl mr-2 font-bold" />
                </span>{" "}
                Package Cost
              </div>
              <div className="md:text-lg text-base text-gray-900 px-2">
                1 package cost: ₹500 
              </div>
            </div>
          </div>

          <div className="md:px-10 md:border-l-2  md:border-l-violet-600">
            <div className="font-georgia text-black text-lg md:text-2xl  md:mt-0 mt-10 md:mx-2">
              <div className="flex">
                <span className="text-violet-600">
                  <BiUserVoice className="mt-1 text-lg md:text-2xl mr-2 font-bold" />
                </span>{" "}
                Level 1 Referral Program
              </div>
              <div className="md:text-lg text-base text-gray-900 px-2">
                10% per month on every package purchase till 5x
              </div>
            </div>
            <div className="font-georgia text-black text-lg md:text-2xl  mt-10 md:mx-2">
              <div className="flex">
                <span className="text-violet-600">
                  <BiUserVoice className="mt-1 text-lg md:text-2xl mr-2 font-bold" />
                </span>{" "}
                Level 2 Referral Program
              </div>
              <div className="md:text-lg text-base text-gray-900 px-2">
                5% per month on every package purchase till 5x
              </div>
            </div>
            <div className="font-georgia text-black text-lg md:text-2xl  mt-10 md:mx-2">
              <div className="flex">
                <span className="text-violet-600">
                  <BiPackage className="mt-1 text-lg md:text-2xl mr-2 font-bold" />
                </span>{" "}
                Min/Max Package Purchase Limit
              </div>
              <div className="md:text-lg text-base text-gray-900 px-2">
                1/Unlimited
              </div>
            </div>
            <div className="font-georgia text-black text-lg md:text-2xl  mt-10 md:mx-2">
              <div className="flex">
                <span className="text-violet-600">
                  <FaMoneyCheck className="mt-1 text-lg md:text-2xl mr-2 font-bold" />
                </span>{" "}
                Accepted Payment Methods
              </div>
              <div className="md:text-lg text-base text-gray-900 px-2">
                We accept payment only in UPI mode
              </div>
            </div>

            <div className="font-georgia text-black text-lg md:text-2xl  mt-10 md:mx-2">
              <div className="flex">
                <span className="text-violet-600">
                  <BiArrowToRight className="mt-1 text-lg md:text-2xl mr-2 font-bold" />
                </span>{" "}
                Withdrawals
              </div>
              <div className="md:text-lg text-base text-gray-900 px-2">
                We provide withdrawals only in UPI mode
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Homepage;
