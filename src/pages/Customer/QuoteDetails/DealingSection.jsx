import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getQuoteDetailForCustomer } from "../../../constants/apiQuotationOfCustomer";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay"

export default function DealingSection() {
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
      <h1 className="text-2xl font-semibold pb-5 pt-12">Quotation Dealing</h1>
      <div className="px-5 pb-5 h-auto ">
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          {quoteDetail.quotationDealings &&
          quoteDetail.quotationDealings.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    Material Discount
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    Furniture Discount
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    Labor Discount
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr key={quoteDetail.id} className="bg-white text-black text-left">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    <div className="text-red-500">
                      {`-${Math.abs(
                        quoteDetail?.quotationDealings[0]?.materialDiscount
                      )}%`}
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    <div className="text-red-500">
                      {`-${Math.abs(
                        quoteDetail?.quotationDealings[0]?.furnitureDiscount
                      )}%`}
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    <div className="text-red-500">
                      {`-${Math.abs(
                        quoteDetail?.quotationDealings[0]?.laborDiscount
                      )}%`}
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    {/* Your action content goes here */}
                  </td>
                </tr>
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
