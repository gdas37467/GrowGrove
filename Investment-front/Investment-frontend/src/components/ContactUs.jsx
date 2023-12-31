
import paris from "./paris.jpg";
import { BsTelegram } from "react-icons/bs";
import { ImMail4 } from "react-icons/im";

function ContactUs() {
  return (
    <>
      <div className="md:w-full h-64 md:h-56  relative mt-30 md:mt-24 ">
        <div
          className="w-full min-h-full md:h-full md:bg-fit bg-cover  bg-center bg-no-repeat h-64 md:pt-56"
          style={{ backgroundImage: `url(${paris})` }}
        ></div>
        <div className="absolute bg-slate-900 bg-opacity-80 w-full  z-10 top-0 h-64 md:h-56">
          <div className="md:mt-24 mt-48 md:text-5xl ml-4 md:ml-32 text-3xl font-georgia text-white ">
            <div className="font-georgia text-white ">
              <span className="font-extrabold font-opsans ">CONTACT <span className="text-violet-600">US</span> </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="text-slate-500 text-base md:text-2xl font-georgia flex justify-center ">
          H A V E<span className="ml-8 text-violet-600">Q U E S T I O N S ?</span>{" "}
        </div>
      </div>

      <div className="mt-20 md:flex mx-10 mb-52 justify-evenly">
        <div className="flex">
          <span>
            <BsTelegram className="text-sky-600 text-5xl mt-1" />
          </span>
          <div className="ml-3">
            <div className="text-slate-500 text-base md:text-lg">Join Us @</div>
            <a href="random"><div className="text-slate-500 text-base md:text-lg">GrowGrove</div></a>
          </div>
        </div>

        <div className="flex md:mt-0 mt-8">
          <span>
            <ImMail4 className="text-sky-600 text-5xl mt-1" />
            
          </span>
          <div className="ml-3">
            <div className="text-slate-500 text-sm md:text-base">Email</div>
            <p ><div className="text-slate-500 text-base md:text-lg">support@growgrove.in</div></p>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
