import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getQuoteDetailForCustomer } from "../../../constants/apiQuotationOfCustomer";

import CurrencyFormatter from "../../../components/Common/CurrencyFormatter";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay"

export default function MaterialDetailSection() {
  const { id } = useParams();
  const [quoteDetail, setQuoteDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchQuoteDetail = async () => {
    try {
      const data = await getQuoteDetailForCustomer(id);
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
      <h1 className="text-2xl font-semibold pb-5 pt-12">Details of materials</h1>
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
                    Total
                  </th>
                 
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quoteDetail.quotationDetails.map((item, index) => {
                  return (
                    <tr key={item.id} className="bg-white text-black text-left">
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
              </tbody>
            </table>
          ) : (
            <p>No materials available.</p>
          )}
        </div>
      </div>
    </>
  );
}
