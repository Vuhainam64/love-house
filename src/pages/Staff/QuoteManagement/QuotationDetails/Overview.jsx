import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getQuotationById } from "../../../../constants/apiQuotationOfStaff";

import {
  QuotationStatusBadge,
  CurrencyFormatter,
  LoadingOverlay,
} from "../../../../components";
import OverviewGrid from "./Grid/OverviewGrid";

export default function Overview({quoteDetail}) {
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
      <div id="overview" className="">
        <h1 className="text-xl font-semibold py-5 uppercase pl-5">Overview</h1>
        <div className="px-5 pb-5 h-auto ">
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
                        />
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
                          />
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
                          />
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
                            />
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
                          />
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
                            />
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
                    <CurrencyFormatter amount={quoteDetail?.quotation?.total} />
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
