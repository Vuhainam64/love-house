import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";

import {
  getTotalProjects,
  getTotalQuotes,
  getTotalAccountByRole, 
} from "../../../constants/apiStatistic";

import { IoMdPricetags } from "react-icons/io";
import { MdRequestQuote } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TbBuildingCommunity } from "react-icons/tb";

export default function StatsGrid() {
  const [totalProjects, setTotalProjects] = useState(null);
  const [totalQuote, setTotalQuote] = useState(null);
  const [totalCustomer, setTotalCustomer] = useState(null);

  const fetchProject = async () => {
    try {
      const data = await getTotalProjects();
      if (data && data.result) {
        setTotalProjects(data.result.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchQuote = async () => {
    try {
      const data = await getTotalQuotes();
      if (data && data.result) {
        setTotalQuote(data.result.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchCustomer = async () => {
    try {
      const data = await getTotalAccountByRole();
      if (data && data.result) {
        setTotalCustomer(data.result.data.CUSTOMER || 0);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchQuote();
    fetchCustomer();
  }, []);

  return (
    <div className="flex flex-wrap lg:flex-nowrap mx-3 mt-6 -mb-6">
  <div className="w-full md:w-1/2 xl:w-1/4 px-3 ">
    <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0 hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
      <TbBuildingCommunity className="w-16 h-16 mr-4 lg:block " />

      <div className="text-gray-700">
        <p className="font-semibold text-3xl">{totalProjects}</p>
        <p>Total Projects</p>
      </div>
    </div>
  </div>

  <div className="w-full md:w-1/2 xl:w-1/4 px-3">
    <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0 hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
      <MdRequestQuote className="w-16 h-16 mr-4 lg:block " />

      <div className="text-gray-700">
        <p className="font-semibold text-3xl">{totalQuote}</p>
        <p>Total Quotation Requests</p>
      </div>
    </div>
  </div>

  <div className="w-full md:w-1/2 xl:w-1/4 px-3">
    <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0 hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
      <FaUsers className="w-16 h-16 mr-4 lg:block" />

      <div className="text-gray-700">
        <p className="font-semibold text-3xl">{totalCustomer}</p>
        <p>Total Customers</p>
      </div>
    </div>
  </div>
</div>

    // <div className="flex  flex-wrap lg:flex-nowrap mx-3 mt-6 -mb-2 ">
    //   <div className="w-1/2 xl:w-1/4 px-3 ">
    //     <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0 hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
    //       <IoMdPricetags className="w-16 h-16 mr-4 lg:block fill-current" />

    //       <div className="text-gray-700">
    //         <p className="font-semibold text-3xl">{totalProjects}</p>
    //         <p>Total Projects</p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="w-1/2 xl:w-1/4 px-3">
    //     <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0 hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
    //       <MdRequestQuote className="w-16 h-16 mr-4 lg:block fill-current" />

    //       <div className="text-gray-700">
    //         <p className="font-semibold text-3xl">{totalQuote}</p>
    //         <p>Total Quotation Requests</p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="w-1/2 xl:w-1/4 px-3">
    //     <div className="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0 hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
    //       <MdRequestQuote className="w-16 h-16 mr-4 lg:block fill-current" />

    //       <div className="text-gray-700">
    //         <p className="font-semibold text-3xl">{totalCustomer}</p>
    //         <p>Total Customers</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <div className="pt-4 px-[25px] bg-[#F8F9FC]">
    //   <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-[30px] mt-4 pb-[15px]">
    //     <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
    //       <div>
    //         <h2 className="text-[#8589DF] text-[11px] leading-[17px] font-bold">
    //           TOTAL PROJECTS
    //         </h2>
    //         <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
    //           {totalProjects}
    //         </h1>
    //       </div>
    //       <TbBuildingCommunity fontSize={28} />
    //     </div>

    //     <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
    //       <div>
    //         <h2 className="text-[#8589DF] text-[11px] leading-[17px] font-bold">
    //           TOTAL QUOTATION REQUESTS
    //         </h2>
    //         <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
    //           {totalQuote}
    //         </h1>
    //       </div>
    //       <MdRequestQuote fontSize={28} />
    //     </div>

    //     <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
    //       <div>
    //         <h2 className="text-[#8589DF] text-[11px] leading-[17px] font-bold">
    //           TOTAL CUSTOMERS
    //         </h2>
    //         <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
    //           {totalCustomer}
    //         </h1>
    //       </div>
    //       <FaRegUser fontSize={28} />
    //     </div>
    //   </div>


    // </div>
  );
}
