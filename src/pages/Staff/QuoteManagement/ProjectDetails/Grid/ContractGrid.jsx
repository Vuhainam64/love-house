import React from "react";
import { NavLink } from "react-router-dom";
import {
  CurrencyFormatter,
  DateFormatter,
} from "../../../../../components";

import { AiOutlineFileDone } from "react-icons/ai";

const ContractGrid = ({ projectDetail }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:hidden pb-6 ">
      <div
        key={projectDetail.id}
        className="bg-gray-50 border border-gray-300 space-y-3 rounded-lg shadow  px-8 pb-5"
      >
        <div className="flex justify-between sm:mb-3 pt-2">
          <span className="text-gray-500">Total:</span>
          <span className="text-red-500 font-bold hover:underline ml-4">
            <CurrencyFormatter amount={projectDetail?.contract?.total} /> VNĐ
          </span>
        </div>

        <div className="flex justify-between sm:mb-3 pt-2">
          <span className="text-gray-500">Total Costs Incurred:</span>
          <span className=" hover:underline ml-4">
            <CurrencyFormatter
              amount={projectDetail?.contract?.totalCostsIncurred}
            />{" "}
            VNĐ
          </span>
        </div>

        <div className="flex justify-between sm:mb-3 pt-2">
          <span className="text-gray-500">Deposit:</span>
          <span className="text-blue-500 font-bold hover:underline ml-4">
            <CurrencyFormatter amount={projectDetail?.contract?.deposit} /> VNĐ
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Start date:</span>

          <span className="">
            <DateFormatter dateString={projectDetail?.contract?.startDate} />
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">End date:</span>

          <span className="">
            <DateFormatter dateString={projectDetail?.contract?.endDate} />
          </span>
        </div>

        <div className=" text-right">
          {projectDetail?.contract?.contractUrl ? (
            <>
              <NavLink
                to={projectDetail?.contract?.contractUrl}
                className="text-blue-500 hover:underline block italic"
              >
                View contract
              </NavLink>
              <NavLink
                to={`/staff/contract-payment-progress/${projectDetail?.contract?.id}`}
                className="text-blue-500 hover:underline italic"
              >
                View payment progress
              </NavLink>
            </>
          ) : (
            <NavLink
              to={`/staff/contract-payment-progress/${projectDetail?.contract?.id}`}
              className="bg-green-600 text-white text-sm p-2 rounded hover:bg-green-400 mt-5"
            >
              Create payment progress
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractGrid;
