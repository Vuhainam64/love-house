import React from "react";
import { NavLink } from "react-router-dom";
import {
  CurrencyFormatter,
  ContractStatusBadge,
  DateFormatter,
} from "../../../../../components";

const ContractGrid = ({ projectDetail }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:hidden pb-6 ">
      <div
        key={projectDetail.id}
        className="bg-gray-50 border border-gray-300 space-y-3 rounded-lg shadow  px-8 py-5"
      >
        <div className="text-right">
          <ContractStatusBadge
            contractStatus={projectDetail?.contract?.contractStatus}
          />
        </div>

        <div className="flex justify-between sm:mb-3 pt-2">
          <span className="flex items-center">
            {" "}
            {/* <FaRegUser className="mr-2 pb-1" size={20} /> */}
            Total:{" "}
          </span>
          <div className="text-red-500 font-bold hover:underline ml-4">
            <CurrencyFormatter amount={projectDetail?.contract?.total} />
          </div>
        </div>

        <div className="flex justify-between sm:mb-3 pt-2">
          <span className="flex items-center">
            {" "}
            {/* <FaRegUser className="mr-2 pb-1" size={20} /> */}
            Total Costs Incurred:{" "}
          </span>
          <div className="text-blue-500 font-bold hover:underline ml-4">
            <CurrencyFormatter
              amount={projectDetail?.contract?.totalCostsIncurred}
            />
          </div>
        </div>

        <div className="flex justify-between sm:mb-3 pt-2">
          <span className="flex items-center">
            {" "}
            {/* <FaRegUser className="mr-2 pb-1" size={20} /> */}
            Deposit:{" "}
          </span>
          <div className="text-blue-500 font-bold hover:underline ml-4">
            <CurrencyFormatter amount={projectDetail?.contract?.deposit} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* <FaRegCalendarAlt className="mr-2 pb-1" size={20} /> */}
            Start date:
          </div>

          <span className="text-gray-500">
            <DateFormatter dateString={projectDetail?.contract?.startDate} />
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* <FaRegCalendarAlt className="mr-2 pb-1" size={20} /> */}
            End date:
          </div>

          <span className="text-gray-500">
            <DateFormatter dateString={projectDetail?.contract?.endDate} />
          </span>
        </div>

        <div className=" text-right">
          {projectDetail?.contract?.contractUrl ? (
            <NavLink
              to={`/staff/contract-payment-progress/${projectDetail?.contract?.id}`}
              className="text-blue-500 hover:underline"
            >
              View payment progress
            </NavLink>
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
