import React from "react";
import { IoMdArrowDropright } from "react-icons/io";
import main_image from "../../assets/images/main_image.jpg";
import CarouselComponent from "../Carousel/CarouselComponent";
import Slider2 from "../Slider/Slider2";

export default function Hero() {
  return (
    <section className="h-full max-h-[640px] mb-8 xl:mb-24">
      <div className="flex flex-col lg:flex-row ">
        <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 lg:pl-24 ">
          <h1 className="lg:text-7xl text-4xl leading-none mb-6 font-semibold">
            Architects with{" "}
            <span className="underline italic decoration-[#fdca51]">
              different
            </span>{" "}
            approach{" "}
          </h1>
          <p className="max-w-[480px] mb-8">
            {" "}
            Architecture is the art and technique of designing and building, as
            distinguished from the skills
          </p>
          <div className="flex items-center gap-x-2">
            <button className="rounded-full px-3 py-2 flex items-center text-sm bg-baseGreen gap-2 transition ease-out duration-300 transform hover:scale-110">
              <p>Our Services</p>
              <IoMdArrowDropright className="text-xl" />
            </button>
            <button className="rounded-full px-3 py-2 flex items-center text-sm gap-2 transition ease-out duration-300 transform hover:scale-110">
              <p>View Projects</p>
              <IoMdArrowDropright className="text-xl" />
            </button>
          </div>
        </div>
      
        <div className="hidden flex-1 lg:flex justify-end items-end " >
          <img src={main_image} alt="" className=" rounded-tl-[80px]" />
         
        </div>
    
      </div>
    </section>
  );
}
