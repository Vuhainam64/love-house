import React, { useEffect, useState } from "react";

import {
  QuotationStatusBadge,
  CurrencyFormatter,
} from "../../../../components";
import OverviewGrid from "./Grid/OverviewGrid";

export default function Overview({ quoteDetail }) {
  const [reloadContent, setReloadContent] = useState(false);

  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };

  const calculateOriginalPrice = (price, discount) => {
    const discountPercentage = Math.abs(discount);
    const originalPrice = price / (1 - discountPercentage / 100);
    return originalPrice;
  };

  return (
    <>
      <div className="flex-1 p-5">
        <div className="px-2 mb-4 pb-6 -mt-4">
          <div className="font-semibold border-b-2 mb-4 flex space-x-4">
            <h4 className="pb-2 uppercase">Quotation</h4>
          </div>

          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className=" p-3 text-sm font-semibold tracking-wide text-center">
                    Raw Material Price
                  </th>
                  <th className=" p-3 text-sm font-semibold tracking-wide text-center">
                    Furniture Price
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    Labor Price
                  </th>

                  <th className=" p-3 text-sm font-semibold tracking-wide text-center">
                    Total
                  </th>
                  <th className=" p-3 text-sm font-semibold tracking-wide text-center">
                    Quotation Status
                  </th>
                  <th className=" p-3 text-sm font-semibold tracking-wide text-center">
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
                    <div className="flex items-center justify-center">
                      <span className="mr-2">
                        <CurrencyFormatter
                          amount={quoteDetail?.quotation?.rawMaterialPrice}
                        />{" "}
                        VNĐ
                      </span>
                      {calculateOriginalPrice(
                        quoteDetail?.quotation?.rawMaterialPrice,
                        quoteDetail?.quotation?.rawMaterialDiscount
                      ) > quoteDetail?.quotation?.rawMaterialPrice && (
                        <span className=" line-through text-gray-500">
                          <CurrencyFormatter
                            amount={calculateOriginalPrice(
                              quoteDetail?.quotation?.rawMaterialPrice,
                              quoteDetail?.quotation?.rawMaterialDiscount
                            )}
                          />{" "}
                          VNĐ
                        </span>
                      )}
                    </div>

                    {quoteDetail?.quotation?.rawMaterialPrice > 0 &&
                      quoteDetail?.quotation?.rawMaterialDiscount > 0 && (
                        <div className="text-red-500">
                          {`(-${Math.abs(
                            quoteDetail?.quotation?.rawMaterialDiscount
                          )}%)`}
                        </div>
                      )}
                  </td>

                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    {quoteDetail?.quotation?.furniturePrice ? (
                      <div className="flex items-center justify-center">
                        <span className="mr-2">
                          <CurrencyFormatter
                            amount={quoteDetail?.quotation?.furniturePrice}
                          />{" "}
                          VNĐ
                        </span>

                        {calculateOriginalPrice(
                          quoteDetail?.quotation?.furniturePrice,
                          quoteDetail?.quotation?.furnitureDiscount
                        ) > quoteDetail?.quotation?.furniturePrice && (
                          <span className="line-through text-gray-500">
                            <CurrencyFormatter
                              amount={calculateOriginalPrice(
                                quoteDetail?.quotation?.furniturePrice,
                                quoteDetail?.quotation?.furnitureDiscount
                              )}
                            />{" "}
                            VNĐ
                          </span>
                        )}
                      </div>
                    ) : (
                      "N/A"
                    )}

                    {quoteDetail?.quotation?.furniturePrice > 0 &&
                      quoteDetail?.quotation?.furnitureDiscount > 0 && (
                        <div className="text-red-500">
                          {`(-${Math.abs(
                            quoteDetail?.quotation?.furnitureDiscount
                          )}%)`}
                        </div>
                      )}
                  </td>

                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    {quoteDetail?.quotation?.laborPrice ? (
                      <div className="flex items-center justify-center">
                        <span className="mr-2">
                          <CurrencyFormatter
                            amount={quoteDetail?.quotation?.laborPrice}
                          />{" "}
                          VNĐ
                        </span>

                        {calculateOriginalPrice(
                          quoteDetail?.quotation?.laborPrice,
                          quoteDetail?.quotation?.laborDiscount
                        ) > quoteDetail?.quotation?.laborPrice && (
                          <span className=" line-through text-gray-500">
                            <CurrencyFormatter
                              amount={calculateOriginalPrice(
                                quoteDetail?.quotation?.laborPrice,
                                quoteDetail?.quotation?.laborDiscount
                              )}
                            />{" "}
                            VNĐ
                          </span>
                        )}
                      </div>
                    ) : (
                      "N/A"
                    )}

                    {quoteDetail?.quotation?.laborPrice > 0 &&
                      quoteDetail?.quotation?.laborDiscount > 0 && (
                        <div className="text-red-500">
                          {`(-${Math.abs(
                            quoteDetail?.quotation?.laborDiscount
                          )}%)`}
                        </div>
                      )}
                  </td>

                  <td className="p-3 text-sm text-red-500 font-semibold whitespace-nowrap text-center">
                    <CurrencyFormatter amount={quoteDetail?.quotation?.total} />{" "}
                    VNĐ
                  </td>

                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    <QuotationStatusBadge
                      quotationStatus={quoteDetail?.quotation?.quotationStatus}
                    />
                  </td>
                  <td className="flex flex-col p-3 text-sm text-gray-700 text-center">
                    {/* {quoteDetail?.quotation?.quotationStatus === 3 && (
                      <button>Sign Contract</button>
                    )} */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <OverviewGrid
            quoteDetail={quoteDetail}
            calculateOriginalPrice={calculateOriginalPrice}
          />
        </div>
      </div>
    </>
  );
}
