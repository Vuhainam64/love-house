import React from "react";

import { FaChevronRight } from "react-icons/fa6";
import { IoPricetagsSharp } from "react-icons/io5";

const ViewSupplierPrice = () => {
  return (
    <div className="flex flex-col p-8 text-gray-900">
      {/* title  */}
      <div className="flex items-center space-x-2 text-xl">
        <IoPricetagsSharp />
        <div>Supplier</div>
        <FaChevronRight />
        <div>Supplier Price Detail</div>
        <FaChevronRight />
      </div>
      <div className="text-2xl text-orange-400 font-semibold py-4">
        View Supplier Price
      </div>
      {/* <div>
        <div className="relative flex w-full pt-8 px-2 items-center">
          <div className="absolute left-4 bottom-0 border-2 border-b-white rounded-t-md z-20 px-2 py-2 cursor-pointer bg-white">
            chuc mung nam moi
          </div>
          <div className="absolute left-60 bottom-0 border-2 border-b-white rounded-t-md z-10 px-2 py-1 cursor-pointer bg-white">
            abcd
          </div>
          <div className="absolute left-80 bottom-0 border-2 border-b-white rounded-t-md z-10 px-2 py-1 cursor-pointer bg-white">
            eeeee
          </div>
          <div className="relative z-0 border-b w-full"></div>
        </div>
      </div> */}
      {/* table  */}
      
    </div>
  );
};

export default ViewSupplierPrice;
