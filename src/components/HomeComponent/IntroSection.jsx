import React from "react";
import intro_image from "../../assets/images/intro_image.jpg";
import { IoMdArrowDropright, IoIosArrowUp } from "react-icons/io";

function Intro() {
  return (
    <>
      <div className="relative overflow-hidden bg-[#f6ffed] lg:py-20 py-8">
        <div className="xl:w-[1200px] mx-auto px-24 pt-8">
          <section className="lg:flex justify-between items-center relative mt-12 p-8">
            <div className="flex justify-center lg:w-1/2">
              <img
                src={intro_image}
                alt=""
                className="lg:w-[420px] w-80 rounded-tl-[100px] rounded-br-[100px] "
              />
            </div>

            <div className="lg:w-1/2 lg:py-0 py-20 mr-24 sm:mx-auto ">
              <p className="text-[#fb7a3f]">LOVEHOUSE</p>
              <h1 className="text-[#054130] lg:text-5xl text-xl font-semibold pt-4 pb-6">
                Building Dreams &{" "}
                <span className="underline decoration-[#fdca51]">
                  Creating Happiness
                </span>
              </h1>
              <p className="text-black leading-8 text-justify">
                Welcome to LOVEHOUSE - where we not only build beautiful
                buildings but also build homes full of love and happiness. We
                are a team of experts in the field of quotation and home
                construction, and we believe that building a house is not just
                about building walls and installing furniture, but also a
                journey to create beautiful things. meaningful moment.
              </p>

              <div className="flex items-center lg:gap-x-8 py-8">
                <button className="rounded-full px-4 py-2 flex items-center text-sm bg-[#fd7b47] text-white gap-2 transition ease-out duration-300 transform hover:scale-110">
                  <p>Read more</p>
                  <IoMdArrowDropright className="text-xl" />
                </button>
              </div>

              <div className="flex justify-between pt-4 lg:gap-0 gap-2">
                <span>
                  <h1 className="text-[#054130] text-4xl font-semibold">5</h1>
                  <p className="w-1/2 lg:text-base text-sm">
                    Years of experience
                  </p>
                </span>

                <span>
                  <h1 className="text-[#054130] text-4xl font-semibold">246</h1>
                  <p className="w-1/2 lg:text-base text-sm">
                    Projects completed
                  </p>
                </span>

                <span>
                  <h1 className="text-[#054130] text-4xl font-semibold">42</h1>
                  <p className="w-1/2 lg:text-base text-sm">Awards gained</p>
                </span>
              </div>
            </div>

            <IoIosArrowUp className="text-[#fb7a3f] text-4xl absolute top-0 left-0 rotate-[315deg]" />
            <IoIosArrowUp className="text-[#fb7a3f] text-4xl absolute top-0 right-0 rotate-45" />
            <IoIosArrowUp className="text-[#fb7a3f] text-4xl absolute bottom-0 left-0 rotate-[225deg]" />
            <IoIosArrowUp className="text-[#fb7a3f] text-4xl absolute bottom-0 right-0 rotate-[134deg]" />
          </section>
        </div>
      </div>
    </>
  );
}

export default Intro;
