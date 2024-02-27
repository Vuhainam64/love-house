import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

import { getQuotationById } from "../../../../constants/apiQuotationOfStaff";

import { CurrencyFormatter, LoadingOverlay } from "../../../../components";

import { FiEdit } from "react-icons/fi";

export default function Material() {
  const { id } = useParams();
  const [quoteDetail, setQuoteDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuoteDetail = async () => {
    try {
      const data = await getQuotationById(id);

      if (data && data.result) {
        setQuoteDetail(data.result.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching quote detail:", error);
    }
  };

  useEffect(() => {
    fetchQuoteDetail();
  }, [id]);
  return (
    <>
      <LoadingOverlay loading={loading} />
      <div id="material">
        <div className="flex items-center mt-12 mb-6 ">
          <h1 className="text-xl font-semibold mr-4 uppercase">
            Details of materials
          </h1>
          {quoteDetail?.quotation?.quotationStatus === 0 && (
            <NavLink
              to={`/staff/manage-material-detail/${quoteDetail?.quotation?.id}`}
            >
              <FiEdit size={25} className="hover:text-baseGreen " />
            </NavLink>
          )}
        </div>

        <div className="px-5 pb-5 h-auto ">
          <div className="overflow-auto rounded-lg shadow hidden md:block">
            {quoteDetail.quotationDetails &&
            quoteDetail.quotationDetails.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-center">
                      No.
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-center">
                      Material name
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                      Unit
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-center">
                      Material type
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-right">
                      Quantity
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-right">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {quoteDetail.quotationDetails.map((item, index) => {
                    return (
                      <tr
                        key={item.id}
                        className="bg-white text-black text-left"
                      >
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                          {index + 1}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                          {item.material.name}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                          {(() => {
                            switch (item.material.unitMaterial) {
                              case 0:
                                return "Kg";
                              case 1:
                                return "m³";
                              case 2:
                                return "Bar";
                              case 3:
                                return "Item";
                              default:
                                return "";
                            }
                          })()}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                          {item.material.materialType === 0
                            ? "Raw Material"
                            : "Funiture"}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                          {item.quantity}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                          <CurrencyFormatter amount={item.total} />
                        </td>
                      </tr>
                    );
                  })}

                  {/* <tr className="bg-gray-100 text-black text-left">
                    <td
                      colSpan="5"
                      className="p-3 text-sm font-semibold tracking-wide text-right"
                    >
                      
                    </td>
                    
                    <td className="p-3 text-sm font-semibold tracking-wide text-right text-red-500">
                    Total: <CurrencyFormatter
                        amount={quoteDetail.quotationDetails.reduce(
                          (total, item) => total + item.total,
                          0
                        )}
                      />
                    </td>
                  </tr> */}
                </tbody>
              </table>
            ) : (
              <p>No materials available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
