import React from "react";

function Intro() {
  return (
    <div className="intro w-[95%] xl:w-[65%] mx-auto px-10 mt-12 mb-24">
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 w-full h-full">
        <div className="content h-[280px] basis-1/2 px-14 items-center flex flex-col justify-center">
          <p className="text-neutral-500 leading-7 text-justify mb-6">
            Welcome to LOVEHOUSE - where we not only build beautiful buildings
            but also build homes full of love and happiness. We are a team of
            experts in the field of quotation and home construction, and we
            believe that building a house is not just about building walls and
            installing furniture, but also a journey to create beautiful things.
            meaningful moment.
          </p>
        </div>

        <div className="post basis-1/2 pl-8 xl:pl-14 ">
          <div className="text-2xl text-center mb-4">LOVEHOUSE</div>
          <div className=" text-3xl text-center font-bold uppercase mb-4">
            Building Dreams, Creating Happiness
          </div>
          <div className="mx-auto lh-button">
            About Us
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
