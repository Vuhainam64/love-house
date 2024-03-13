import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { getProjectByIdForCustomer } from "../../../constants/apiQuotationOfCustomer";

import {
  CurrencyFormatter,
  ContractStatusBadge,
  LoadingOverlay,
  DateFormatter,
} from "../../../components";
import SignContractForm from "../Contract/SignContractForm";
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
  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };

  return (
    <>
      {projectDetail?.contract !== null && (
        <>
          <LoadingOverlay loading={loading} />
          
          <div className="flex-1 p-5">
            <div className="px-2 mb-4">
              <div className="font-semibold border-b-2 mb-4 ">
                <h4 className="pb-2 uppercase"> Contract information</h4>
              </div>
            </div>
            <div className="py-5 px-2 h-auto mt-4 overflow-x"> 
            <div className="rounded-lg shadow hidden md:block">
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
                  <tr key={projectDetail.id} className="bg-white text-black ">
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
                    <td className="p-3 text-sm text-gray-700 whitespace-wrap text-center flex-col">
                      {projectDetail?.contract?.contractStatus === 1 ||
                      projectDetail?.contract?.contractStatus === 2 ? (
                        <NavLink
                          to={projectDetail?.contract?.contractUrl}
                          className="mb-5 text-blue-500 hover:underline block"
                        >
                          View contract
                        </NavLink>
                      ) : null}
                     
                        <NavLink
                          to={`/customer/payment-progress/${projectDetail?.contract?.id}`}
                          className="mb-5 text-blue-500 hover:underline block"
                        >
                          View payment progress
                        </NavLink>
                      
                      {projectDetail?.contract != null &&
                        projectDetail?.contract.contractStatus == 1 && (
                          // <button>Sign Contract</button>

                          <SignContractForm
                            onModalClose={handleReloadContent}
                            id={projectDetail?.contract?.id}
                            projectDetail={projectDetail}
                            fetchData={fetchProjectDetail}
                          />
                        )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
             </div>

          </div>

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
                    <CurrencyFormatter
                      amount={projectDetail?.contract?.total}
                    />
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
                    <CurrencyFormatter
                      amount={projectDetail?.contract?.deposit}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* <FaRegCalendarAlt className="mr-2 pb-1" size={20} /> */}
                    Start date:
                  </div>

                  <span className="text-gray-500">
                    <DateFormatter
                      dateString={projectDetail?.contract?.startDate}
                    />
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* <FaRegCalendarAlt className="mr-2 pb-1" size={20} /> */}
                    End date:
                  </div>

                  <span className="text-gray-500">
                    <DateFormatter
                      dateString={projectDetail?.contract?.endDate}
                    />
                  </span>
                </div>

                <div className=" text-right">
                  {projectDetail?.contract?.contractStatus === 1 ? (
                    <NavLink
                      to={projectDetail?.contract?.contractUrl}
                      className="text-blue-500 hover:underline"
                    >
                      View contract
                    </NavLink>
                  ) : null}
                  <div>
                    <NavLink
                      to={`/customer/payment-progress/${projectDetail?.contract?.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View payment progress
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
        </>
      )}
    </>
  );
}
