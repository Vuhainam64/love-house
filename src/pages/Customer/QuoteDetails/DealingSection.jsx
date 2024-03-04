import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getQuoteDetailForCustomer } from "../../../constants/apiQuotationOfCustomer";
import { LoadingOverlay } from "../../../components";
import DealForm from "../DealQuotation/DealForm";

export default function DealingSection() {
  const { id } = useParams();
  const [quoteDetail, setQuoteDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [reloadContent, setReloadContent] = useState(false);

  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };

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
  }, [id, reloadContent]);

  return (
    <>
      { quoteDetail?.quotation?.quotationStatus !== 3 && (
        <>
          <LoadingOverlay loading={loading} />
        

          {quoteDetail.quotationDealings?.length > 0 ? (
            <div className="px-5 pb-5 h-auto ">
              <div className="overflow-auto rounded-lg shadow hidden md:block">
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
                    <tr
                      key={quoteDetail.id}
                      className="bg-white text-black text-left"
                    >
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
              </div>

              <div className="grid grid-cols-1 gap-4 md:hidden">
                <div
                  key={quoteDetail.id}
                  className="bg-gray-50 border border-gray-300  space-y-3 rounded-lg shadow px-8 py-5"
                >
                  <div className="flex justify-between sm:mb-3 pt-2">
                    <span className="flex items-center">
                      Material Discount:
                    </span>
                    <div className="text-red-500">
                      {`-${Math.abs(
                        quoteDetail?.quotationDealings[0]?.materialDiscount
                      )}%`}
                    </div>
                  </div>

                  <div className="flex justify-between sm:mb-3 pt-2">
                    <span className="flex items-center">
                      Furniture Discount:
                    </span>
                    <div className="text-red-500">
                      {`-${Math.abs(
                        quoteDetail?.quotationDealings[0]?.furnitureDiscount
                      )}%`}
                    </div>
                  </div>

                  <div className="flex justify-between sm:mb-3 pt-2">
                    <span className="flex items-center">Labor Discount:</span>
                    <div className="text-red-500">
                      {`-${Math.abs(
                        quoteDetail?.quotationDealings[0]?.laborDiscount
                      )}%`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="ml-5">
              {" "}
              <DealForm onModalClose={handleReloadContent} />
            </div>
          )}
        </>
      ) }
    </>
  );
}
