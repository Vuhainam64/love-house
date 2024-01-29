import React from "react";
import { RiMenuUnfoldFill } from "react-icons/ri";

function BtnViewMore() {
  return (
    <button className="flex items-center hover:text-baseOrange my-2 py-3 transition duration-200">
      <RiMenuUnfoldFill size={40} className="text-baseOrange pr-2"/>
      View more
    </button>
  );
}

export default BtnViewMore;
