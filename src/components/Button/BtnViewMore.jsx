import React from "react";
import { IoMdArrowDropright, IoIosArrowUp } from "react-icons/io";

function BtnViewMore() {
  return (
    <div className="flex items-center lg:gap-x-8 py-8">
    <button className="rounded-full px-4 py-2 flex items-center justify-center text-sm bg-baseGreen text-white gap-2 transition ease-out duration-300 transform hover:scale-110">
      <p>View more</p>
      <IoMdArrowDropright className="text-xl " />
    </button>
  </div>
  );
}

export default BtnViewMore;
