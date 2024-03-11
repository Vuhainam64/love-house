import React from "react";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";

import {CurrencyFormatter} from "../../components"

export default function HouseItem({ sampleProject = {}, staticFile , index }) {
    const { id, location, header, totalArea, estimatePrice } = sampleProject;

    const url =
  staticFile && staticFile.length > 0 && index !== undefined && staticFile[index]
    ? staticFile[index].url
    : null;

  
    return (
      <div className="bg-white shadow-1 p-5 rounded-lg  w-full max-w-[352px]  mx-auto cursor-pointer hover:shadow-2xl transition">
        <img src={url} alt="" className="mb-8 rounded-lg h-[165px]" />
        <div className="mb-4 flex gap-x-2 text-sm">
          <div className="bg-baseGreen rounded-full text-white px-3">
            {location}
          </div>
        </div>
  
        <div className="text-lg font-semibold max-w-[260px] h-[100px] hover:text-[#054130]">
          <NavLink to={`/house-projects/details/${id}`}>{header}</NavLink>
        </div>
  
        <div>
          <div className="flex items-center text-gray-600 gap-1">
            <div className="text-[20px]">
              <IoHomeOutline />
            </div>
            <div>{totalArea} m&#178;</div>
          </div>
        </div>
  
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <MdAttachMoney className="text-[20px]" />
            Construction:
          </div>
  
          <div className="text-lg font-semibold text-red-500 ">
            <CurrencyFormatter amount={estimatePrice} />
          </div>
        </div>
      </div>
    );
}
