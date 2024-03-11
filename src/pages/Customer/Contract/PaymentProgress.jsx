import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

import { getContractProgressById } from "../../../constants/apiContract"
import { getProjectByIdForCustomer } from "../../../constants/apiQuotationOfCustomer"

import {
  CustomerSidebar,
  LoadingOverlay,
  DateFormatter,
  PaymentStatusBadge,
  CurrencyFormatter,
  DBHeader,
} from "../../../components"
import PaymentModal from "./PaymentModal";

export default function PaymentProgress() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [reloadContent, setReloadContent] = useState(false);
  const [progressDetail, setProgressDetail] = useState([]);
  const [projectDetail, setProjectDetail] = useState({});


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



  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="flex overflow-hidden">

        <div className="h-screen overflow-y-auto flex-1 bg-gray-100">
          <h1 className="text-2xl font-semibold pb-2 mt-5 uppercase text-center">
            Payment Progress Detail
          </h1>

          {/* {quote?.quotation?.quotationStatus === 0 && ( */}
          <div className="flex items-center">
            <div className="ml-4">


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
                    End Date
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide">
                      Payment Status
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide">
                      Action
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
                          {item.payment.paymentStatus === 0 ?
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                              <PaymentModal onModalClose={handleReloadContent} paymentId={item.payment.id} />
                            </td>
                            :
                            <td></td>
                          }


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

            <div className="grid grid-cols-1 gap-4 md:hidden">
              {progressDetail &&
                progressDetail.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 border border-gray-300 space-y-4 rounded-lg shadow px-8 py-5"
                  >
                    <div className="flex items-center justify-between space-x-5 text-sm">
                      <div className="flex flex-col space-y-3">
                        <div className="flex">
                          <div className="text-blue-500 font-bold hover:underline mr-2">
                            #{index + 1}
                          </div>
                          <div className="text-blue-500 font-bold uppercase">
                            {item.name}
                          </div>
                        </div>

                        <div>
                          <PaymentStatusBadge
                            paymentStatus={item.payment.paymentStatus}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      Description:
                      <span className="ml-2">{item.payment.content}</span>
                    </div>
                    <div>
                      Price:
                      <span className="ml-2 text-red-500 font-semibold">
                        <CurrencyFormatter amount={item.payment.price} />
                      </span>
                    </div>
                    <div>
                      <DateFormatter dateString={item.date} />
                    </div>


                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
