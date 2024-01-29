import React from "react";
import tu_van_tk from "../../assets/images/tu_van_tk.png";
import bao_gia from "../../assets/images/bao_gia.png"

function QuoteSection() {
  return (
    <div className="intro w-[95%] xl:w-[65%] mx-auto px-10 mt-12 mb-24">
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 w-full h-full">
        <div className="content h-[280px] basis-1/2 px-14 items-center flex flex-col justify-center">
          <div className="mb-5">
            <img src={tu_van_tk} alt="" />
          </div>

          <div className="desc w-460">
            <h3 className="font-semibold text-center mb-3">
              DO YOU NEED ADVICE AND CONSULTATION FROM AN ARCHITECTURAL EXPERT?
            </h3>
            <div className="text-neutral-500 leading-7 text-center mb-6">
              Don't hesitate, leave your information, LOVEHOUSE's team of
              experts will call you back to chat with you. Absolutely FREE
            </div>
            <button className="mx-auto lh-button flex justify-center">
              SIGN UP FOR ADVICE
            </button>
          </div>
        </div>

        <div className="post basis-1/2 items-center flex flex-col justify-center  xl:pl-14 ">
          <div className="mb-5">
            <img src={bao_gia} alt="" />
          </div>

          <div className="desc w-460">
            <h3 className="font-semibold text-center mb-3">
            DO YOU NEED A QUOTE FOR CONSTRUCTION ACCORDING TO EXISTING DRAWINGS?
            </h3>
            <div className="text-neutral-500 leading-7 text-center mb-6">
            You have 3D perspective design drawings, detailed drawings, you need to find a unit with a reputable factory to construct?
            </div>
            <button className="mx-auto lh-button flex justify-center">
            REQUEST CONSTRUCTION QUOTE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteSection;
