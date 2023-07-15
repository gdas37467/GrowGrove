import React from 'react'
import tim from "../rename.jpeg";


function Homepage() {
  return (
    <>
    
    <div className="md:w-full h-screen  relative mt-30 md:mt-24 ">
        <div
          className="w-full h-full md:bg-cover bg-cover bg-fixed bg-no-repeat"
          style={{ backgroundImage: `url(${tim})` }}
        ></div>

        <div className="absolute bg-purple-800 bg-opacity-60 md:w-2/5 w-11/12 mx-4  z-10 top-0 h-full">
          <div className="md:m-20 mt-40 md:text-6xl ml-3 text-4xl font-opsans text-white">
            <div className="font-georgia">
              <span className="font-extrabold font-georgia">CRYPTO</span> &
            </div>

            <div className="font-extrabold mt-2 font-georgia">OPTION </div>
            <div className="mt-2 font-georgia">TRADING </div>
            <div className="mt-2 font-georgia">PLATFORM</div>
          </div>
          <div className="font-georgia text-white md:mx-20 mt-10 mx-3 md:text-xl text-lg">
            -"Experience the power of decentralized investments and unlock your
            financial freedom with us. Sign up for a Fully Automated
            account."
          </div>
        </div>
      </div>
      <div className="mt-16 mb-20">
        <div className="md:flex bg-white">
          <div className="md:w-2/5 bg-sky-100 pb-4">
            <div className="md:pl-28 px-16 pt-10 md:pt-20 md:pr-4 text-4xl md:text-6xl font-bold font-georgia">
              Facilities that we <span className="font-normal">provide</span>
            </div>
            <div className="md:mt-10 mt-8 px-2 md:ml-10">
              <img
                src="https://1novatechcdn.novatechfx.com/NOVATECHLTD/UserFiles/novotech//mt5-charts_clipped_rev_2.png"
                alt=""
              />
            </div>
          </div>
          <div className="md:w-3/5 bg-white">
            <div className="md:flex mt-28 md:mt-16">
              <div className="mx-12 md:mx-0 md:ml-12 md:pr-20">
                <div className="text-lg ml-2 md:mx-0 font-georgia text-violet-600 mb-1">
                  {" "}
                  <span className="inline-block bg-violet-600 w-2 h-2 mb-1">
                    {" "}
                  </span>{" "}
                  AFFILIATE MARKETING
                </div>
                <div className="text-violet-600 font-georgia pl-2 mt-2 mx-1 md:mx-0 md:mt-4">
                  Earn commissions through affiliate marketing and forming
                  successful partnerships. By sharing our platform with others
                  you can earn profits as you buld teams and collect a
                  percentage of all fees.
                </div>
              </div>
              <div className="mx-12 md:mx-0 md:ml-24 md:mr-12 md:mt-0 mt-10">
                <div className="text-lg ml-2 md:mx-0 font-georgia text-violet-600 mb-1">
                  {" "}
                  <span className="inline-block bg-violet-600 w-2 h-2 mb-1">
                    {" "}
                  </span>{" "}
                  TEAM of EXPERTS
                </div>
                <div className="text-violet-600 font-georgia pl-2 mt-2 mx-0 md:mx-0 md:mt-4">
                  Our team is trusted by 1000s of clients worldwide and is here
                  to help you. We're fast, reliable, and always ready to get you
                  set up. So, sit and relax , our group of 5 International
                  Traders will trade with your money.
                </div>
              </div>
            </div>
            <div className="md:flex mt-10 md:mt-32 ">
              <div className="mx-12">
                <div className="text-lg ml-2 md:mx-0 text-violet-600 font-georgia mb-1">
                  {" "}
                  <span className="inline-block bg-violet-600  w-2 h-2 mb-1">
                    {" "}
                  </span>{" "}
                  NO DEPOSIT FEES
                </div>
                <div className="text-violet-600 font-georgia pl-2 mt-2 md:mt-4">
                  Trade as soon as you open and fund your account with ZERO
                  deposit fees.
                </div>
              </div>
              <div className="mx-12  mt-10 md:mt-0">
                <div className="text-lg md:text-xl ml-2 md:mx-0 text-violet-600 font-georgia mb-1">
                  {" "}
                  <span className="inline-block bg-violet-600 w-2 h-2 mb-1">
                    {" "}
                  </span>{" "}
                  24/7 CUSTOMER SERVICE
                </div>
                <div className="text-violet-600 font-georgia pl-2 mt-2 md:mt-4">
                  Chat with us online or email us for quick replies to your
                  inquiries.
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
    </>
  )
}

export default Homepage
