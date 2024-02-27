import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import {getProjectByIdForCustomer} from "../../../constants/apiQuotationOfCustomer"

import { CurrencyFormatter, ContractStatusBadge, LoadingOverlay, DateFormatter } from "../../../components"

export default function Contract() {
    const { id } = useParams();
    const [projectDetail, setProjectDetail] = useState({});
    const [loading, setLoading] = useState(true);
  
    const fetchProjectDetail = async () => {
        try {
          const data = await getProjectByIdForCustomer(id);
    
          if (data && data.result) {
            setProjectDetail(data.result.data);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching project detail:", error);
        }
      };
    
      useEffect(() => {
        fetchProjectDetail();
      }, [id]);
  return (
    <>
      {projectDetail?.contract !== null && (
        <>
          <LoadingOverlay loading={loading} />
          <h1 className="text-xl font-semibold py-5 uppercase">Contract information</h1>

          <div className="p-5 h-225">
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-center">
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
                      Status
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr
                    key={projectDetail.id}
                    className="bg-white text-black "
                  >
                    <td className="p-3 text-sm text-red-500 font-semibold whitespace-nowrap text-center">
                      <CurrencyFormatter
                        amount={projectDetail?.contract?.total}
                      />
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <CurrencyFormatter
                        amount={projectDetail?.contract?.totalCostsIncurred}
                      />
                    </td>
                    <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <CurrencyFormatter
                        amount={projectDetail?.contract?.deposit}
                      />
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
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <ContractStatusBadge
                        contractStatus={projectDetail?.contract?.contractStatus}
                      />
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center flex-col">
                      {projectDetail?.contract?.contractStatus === 2 ? (
                        <NavLink
                          to={projectDetail?.contract?.contractUrl}
                          className="text-blue-500 hover:underline"
                        >
                          View contract
                        </NavLink>
                      ) : null }
                      <div>
                      <NavLink
                        to={`/customer/payment-progress/${projectDetail?.contract?.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        View payment progress
                      </NavLink>
                      </div>
                       
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  )
}
