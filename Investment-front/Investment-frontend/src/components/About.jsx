import paris from "./paris.jpg";

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
              <span className="font-extrabold font-georgia ">
                A B O U T <span className="ml-5 text-violet-600">U S</span>
              </span>
              <div className="text-white font-georgia md:text-lg text-base mt-2">
                {" "}
                Gateway to {" "}
                <span className="text-violet-600">Investment Excellence!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 md:mt-10 md:ml-32 ml-5 font-georgia">
        <div className="text-lg md:text-2xl text-slate-500">
          <span>W E L C O M E </span> <span className="ml-3">T O</span>{" "}
          <span className="ml-3 text-violet-600">G R O W G R O V E</span>
          <div className="text-slate-500 text-sm md:text-base mt-5 mr-5 md:mr-32">
            At GrowGrove, we take pride in being a dependable intermediary
            between you, the investor, and the ever-evolving world of mutual
            funds. Our platform offers a unique opportunity for individuals and
            businesses alike to participate in the mutual fund market without
            the need for direct involvement in fund management. With our team of
            seasoned experts at the helm, we strive to deliver exceptional
            returns on your investments while ensuring the utmost security and
            transparency.
          </div>
        </div>
        <div className="text-lg md:text-2xl text-slate-500 mt-10">
          <span className="">O U R </span>{" "}
          <span className="ml-3 text-violet-600">V I S I O N ? </span>
          <div className="text-slate-500 text-sm md:text-base mt-5 mr-5 md:mr-32">
            To be at the forefront of the global financial revolution,
            empowering individuals and businesses with seamless access to the
            world of mutual fund investments. We envision GrowGrove as the
            premier platform, inspiring trust and innovation, while nurturing a
            community united by a shared commitment to financial prosperity and
            widespread adoption of mutual fund investments. Our vision is to
            lead the charge in shaping a future where mutual funds drive
            positive economic change, fostering financial inclusion and
            transforming lives worldwide
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
