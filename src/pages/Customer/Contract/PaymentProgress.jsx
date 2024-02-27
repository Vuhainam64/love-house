import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

import { getContractProgressById } from "../../../constants/apiContract"

import {
    StaffSidebar,
    LoadingOverlay,
    DateFormatter,
    PaymentStatusBadge,
    CurrencyFormatter,
  } from "../../../components"
import SignContractForm from "./SignContractForm";

export default function PaymentProgress() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [reloadContent, setReloadContent] = useState(false);
    const [progressDetail, setProgressDetail] = useState([]);

  
    const fetchProgressDetail = async () => {
      try {
        const data = await getContractProgressById(id);
  
        if (data && data.result) {
          setProgressDetail(data.result.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching progress detail:", error);
      }
    };
  
    const handleReloadContent = () => {
      setReloadContent((prev) => !prev);
    };
  
    useEffect(() => {
      fetchProgressDetail();
    }, [id, reloadContent]);

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
      <LoadingOverlay loading={loading} />
      <div className="flex">
        <StaffSidebar />

        <div className="h-screen flex-1 p-7">
          <h1 className="text-3xl font-semibold pb-4 pl-4">
            Payment Progress Detail
          </h1>

          {/* {quote?.quotation?.quotationStatus === 0 && ( */}
          <div className="flex items-center">
            <div className="ml-4">
              {/* <NavLink
                to={`/staff/create-list-progress/${id}`}
                className="text-blue-500 hover:underline"
              >
                Sign Contract
              </NavLink> */}
               <SignContractForm onModalClose={handleReloadContent} />

             
            </div>
          </div>
          {/* )} */}

          {/* <button className="flex items-center" onClick={handleBack}>
          Back
        </button>
       */}

          <div className="p-5 h-screen bg-gray-100 ">
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className=" p-3 text-sm font-semibold tracking-wide">
                      No.
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide">
                      Name
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide">
                      Description
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-right">
                      Price
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide">
                      Date
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide">
                      Payment Status
                    </th>

                   
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {progressDetail &&
                    progressDetail.map((item, index) => {
                      return (
                        <tr key={item.id} className="bg-white text-black ">
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {index + 1}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {item.name}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {item.payment.content}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                            <CurrencyFormatter amount={item.payment.price} />
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            <DateFormatter dateString={item.date} />
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            <PaymentStatusBadge
                              paymentStatus={item.payment.paymentStatus}
                            />
                          </td>
                          

                          {/* {quote?.quotation?.quotationStatus === 0 && (
                            <td className="p-3 text-sm text-gray-700 text-center">
                              <div className="flex justify-center">
                                <div>
                                  <FormUpdateMaterialDetail
                                    quoteDetail={item}
                                    onModalClose={handleReloadContent}
                                  />
                                </div>

                                <div>
                                  <DeleteMaterialDetail
                                    quoteDetail={item}
                                    onDelete={handleReloadContent}
                                  />
                                </div>
                              </div>
                            </td>
                          )} */}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
