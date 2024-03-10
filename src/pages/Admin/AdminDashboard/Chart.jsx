import React from "react";
import ConstructionTypeChart from "./Chart/ConstructionTypeChart";
import ProjectBarChart from "./Chart/ProjectBarChart";

import ProjectStatusChart from "./Chart/ProjectStatusChart";
import ContractStatusChart from "./Chart/ContractStatusChart";
import RecentRequest from "./Table/RecentRequest";

function Chart() {
  return (
    <>
      <div className="flex mt-[22px] w-full gap-[30px] px-5 pb-5 sm:flex-col md:flex-row">
        <div className="basis-[65%] border bg-white shadow-md cursor-pointer rounded-[4px] ">
          <div className="bg-[#F8F9FC] shadow flex items-center py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
            <h2>Project Overview</h2>
          </div>
          <div>
            <ProjectBarChart />
          </div>
          <div>
            <RecentRequest />
          </div>
        </div>

        <div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] shadow flex items-center py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
            <h2>Project Status</h2>
          </div>
          <div>
            <ProjectStatusChart />
          </div>
        </div>

     
      </div>

      <div className="flex mt-[22px] w-full gap-[30px] px-5 pb-5 sm:flex-col md:flex-row">
        <div className="basis-[50%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-center py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
            <h2>Construction Type</h2>
          </div>

          <div className="flex items-center justify-center">
            <ConstructionTypeChart />
          </div>
        </div>

        <div className="basis-[50%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
            <h2>Contract Status</h2>
          </div>

          <div className="flex items-center justify-center">
            <ContractStatusChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chart;
