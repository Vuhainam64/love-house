import React from "react";
import { NavLink } from "react-router-dom";

import {
  CurrencyFormatter,
  ContractStatusBadge,
  DateFormatter,
} from "../../../../components";
import ContractGrid from "./Grid/ContractGrid";

export default function ContractSection2({ projectDetail }) {
  return (
    <>
      {projectDetail?.contract !== null && (
        <>
          <div className="flex-1 px-5 pb-12">
            <div className=" px-2 mb-4 h-auto pb-12">
              <div className="font-semibold border-b-2 mb-4 flex space-x-4 items-center">
                <h4 className="pb-2 uppercase">Contract</h4>
                <div className="pb-2">
                  <ContractStatusBadge
                    contractStatus={projectDetail?.contract?.contractStatus}
                  />
                </div>
              </div>

              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className=" p-3 text-sm font-semibold tracking-wide">
                        Total
                      </th>
                      <th className=" p-3 text-sm font-semibold tracking-wide ">
                        Total Costs Incurred
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide">
                        Deposit
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide">
                        Start Date
                      </th>

                      <th className=" p-3 text-sm font-semibold tracking-wide">
                        End Date
                      </th>

                      <th className=" p-3 text-sm font-semibold tracking-wide">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr
                      key={projectDetail.id}
                      className="bg-white text-black text-left"
                    >
                      <td className="p-3 text-sm text-red-500 font-semibold whitespace-wrap text-center">
                        <CurrencyFormatter
                          amount={projectDetail?.contract?.total}
                        />{" "}VNĐ
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        <CurrencyFormatter
                          amount={projectDetail?.contract?.totalCostsIncurred}
                        />{" "}VNĐ
                      </td>
                      <td className="w-40 p-3 text-sm text-blue-500 font-semibold whitespace-nowrap text-center">
                        <CurrencyFormatter
                          amount={projectDetail?.contract?.deposit}
                        />{" "}VNĐ
                      </td>
                      <td className=" w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        <DateFormatter
                          dateString={projectDetail?.contract?.startDate}
                        />
                      </td>
                      <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        <DateFormatter
                          dateString={projectDetail?.contract?.endDate}
                        />
                      </td>
                     
                      <td className="p-3 text-sm text-gray-700 whitespace-wrap text-center">
                        {projectDetail?.contract?.contractUrl ? (
                          <>
                            <NavLink
                              to={projectDetail?.contract?.contractUrl}
                              className="text-blue-500 hover:underline block"
                            >
                              View contract
                            </NavLink>
                            <NavLink
                              to={`/staff/contract-payment-progress/${projectDetail?.contract?.id}`}
                              className="text-blue-500 hover:underline block"
                            >
                              View payment progress
                            </NavLink>
                          </>
                        ) : (
                          <NavLink
                            to={`/staff/contract-payment-progress/${projectDetail?.contract?.id}`}
                            className="text-blue-500 hover:underline"
                          >
                            Create payment progress
                          </NavLink>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <ContractGrid projectDetail={projectDetail} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
