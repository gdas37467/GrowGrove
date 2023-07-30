import React from "react";
import paris from "./paris.jpg";
import ceo from "./ceo.jpeg"

function About() {
  return (
    <>
      <div className="md:w-full h-64 md:h-56  relative mt-30 md:mt-24 ">
        <div
          className="w-full min-h-full md:h-full md:bg-fit bg-cover  bg-center bg-no-repeat h-64 md:pt-56"
          style={{ backgroundImage: `url(${paris})` }}
        ></div>
        <div className="absolute bg-slate-900 bg-opacity-80 w-full  z-10 top-0 h-64 md:h-56">
          <div className="md:mt-24 mt-48 md:text-3xl ml-4 md:ml-32 text-xl font-opsans text-white ">
            <div className="font-opsans text-white ">
              <span className="font-extrabold font-opsans ">
                A B O U T <span className="ml-5">U S</span>
              </span>
              <div className="text-white md:text-base text-sm mt-2">
                {" "}
                Gateway to Cryptocurrency Investment Excellence!
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 md:mt-10 md:ml-32 ml-5">
        <div className="text-lg md:text-2xl text-slate-500">
          <span>W E L C O M E </span> <span className="ml-3">T O</span>{" "}
          <span className="ml-3">C R Y P T O P T I O N</span>
          <div className="text-slate-500 text-sm md:text-base mt-5 mr-5 md:mr-32">
            At CryptOption, we take pride in being a reliable intermediary
            between you, the investor, and the ever-dynamic world of
            cryptocurrencies. Our platform offers a unique opportunity for
            individuals and businesses alike to participate in the crypto market
            without the need for direct involvement in trading. With our team of
            seasoned experts at the helm, we strive to deliver exceptional
            returns on your investments while ensuring the utmost security and
            transparency.
          </div>
        </div>
        <div className="text-lg md:text-2xl text-slate-500 mt-10">
          <span className="">O U R </span>{" "}
          <span className="ml-3">V I S I O N ? </span>
          <div className="text-slate-500 text-sm md:text-base mt-5 mr-5 md:mr-32">
            To be at the forefront of the global financial revolution,
            empowering individuals and businesses with seamless access to the
            decentralized world of cryptocurrencies. We envision CryptOption as
            the premier platform, inspiring trust and innovation, while
            nurturing a community united by a shared commitment to financial
            prosperity and widespread adoption of digital assets. Our vision is
            to lead the charge in shaping a future where cryptocurrencies drive
            positive economic change, fostering financial inclusion and
            transforming lives worldwide.
          </div>
        </div>
        <hr className="mt-10 mr-5 md:mr-32"/>
        <div className="mt-20 flex justify-center">
        <div className="w-40 md:w-56 rounded-full overflow-hidden">
          <img src={ceo} alt="" className=" "/>
          
        </div>
        
        </div>
        <div className="text-slate-500 flex justify-center mt-3">
            <div className="text-black text-base md:text-xl font-semibold">Divnendu tiwari</div>

          </div>
          <div className="text-slate-500 flex justify-center mt-1">
            <div className="text-slate-500 text-base md:text-xl ">CEO</div>

          </div>
          <div className="text-slate-500 flex justify-center mt-1">
            <div className="text-slate-500 text-base md:text-xl ">12 years+ experience ,option hedge trading</div>

          </div>
          <div className="text-slate-500 flex justify-center mt-0">
            <div className="text-slate-500 text-base md:text-xl ">8 years+ experience ,crypto trading</div>

          </div>

        
        <div className="text-base md:text-lg text-slate-500 mt-10 mb-10 flex justify-center">
        Join CryptOption today, and let our expert team navigate the cryptocurrency markets on your behalf.
        
        </div>
        
      </div>
    </>
  );
}

export default About;
