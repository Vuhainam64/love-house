import React from "react";
import { NavLink } from "react-router-dom";

import {
  QuotationStatusBadge,
  CurrencyFormatter,
  DateFormatter,
} from "../../../components";

import QuotationOverviewGrid from "./Grid/QuotationOverviewGrid";

export default function QuotationOverviewSection({ projectDetail }) {
  const calculateOriginalPrice = (price, discount) => {
    const discountPercentage = Math.abs(discount);
    const originalPrice = price / (1 - discountPercentage / 100);
    return originalPrice;
  };

  return (
    <>
      {projectDetail.quotations?.length > 0 && (
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
                      <th className="p-3 text-sm font-semibold tracking-wide ">
                        No.
                      </th>

                      <th className="p-3 text-sm font-semibold tracking-wide ">
                        Raw Material Price
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide ">
                        Furniture Price
                      </th>
                      <th className="w-24 p-3 text-sm font-semibold tracking-wide ">
                        Labor Price
                      </th>
                      <th className=" p-3 text-sm font-semibold tracking-wide ">
                        Total
                      </th>

                      <th className=" p-3 text-sm font-semibold tracking-wide ">
                        Quotation Status
                      </th>
                      <th className=" p-3 text-sm font-semibold tracking-wide">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {projectDetail.quotations &&
                      projectDetail.quotations.map((quotation, index) => (
                        <tr
                          key={quotation.id}
                          className="bg-white text-black text-left"
                        >
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {index + 1}
                          </td>

                          <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {quotation.rawMaterialPrice ? (
                              <div className="flex items-center justify-center">
                                <span className="mr-1">
                                  <CurrencyFormatter
                                    amount={quotation.rawMaterialPrice}
                                  />{" "}
                                  VNĐ
                                </span>
                                {calculateOriginalPrice(
                                  quotation.rawMaterialPrice,
                                  quotation.rawMaterialDiscount
                                ) > quotation.rawMaterialPrice && (
                                  <span className="line-through text-gray-500">
                                    <CurrencyFormatter
                                      amount={calculateOriginalPrice(
                                        quotation.rawMaterialPrice,
                                        quotation.rawMaterialDiscount
                                      )}
                                    />{" "}
                                    VNĐ
                                  </span>
                                )}
                              </div>
                            ) : (
                              "N/A"
                            )}
                            {quotation.rawMaterialPrice > 0 &&
                              quotation.rawMaterialDiscount > 0 && (
                                <div className="text-red-500">
                                  {`(-${Math.abs(
                                    quotation.rawMaterialDiscount
                                  )}%)`}
                                </div>
                              )}
                          </td>

                          <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {quotation.furniturePrice ? (
                              <div className="flex items-center justify-center">
                                <span className="mr-2">
                                  <CurrencyFormatter
                                    amount={quotation.furniturePrice}
                                  />{" "}
                                  VNĐ
                                </span>
                                {calculateOriginalPrice(
                                  quotation.furniturePrice,
                                  quotation.furnitureDiscount
                                ) > quotation.furniturePrice && (
                                  <span className="line-through text-gray-500">
                                    <CurrencyFormatter
                                      amount={calculateOriginalPrice(
                                        quotation.furniturePrice,
                                        quotation.furnitureDiscount
                                      )}
                                    />{" "}
                                    VNĐ
                                  </span>
                                )}
                              </div>
                            ) : (
                              "N/A"
                            )}
                            {quotation.furniturePrice > 0 &&
                              quotation.furnitureDiscount > 0 && (
                                <div className="text-red-500">
                                  {`(-${Math.abs(
                                    quotation.furnitureDiscount
                                  )}%)`}
                                </div>
                              )}
                          </td>

                          <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {quotation.laborPrice > 0 ? (
                              <div className="flex items-center justify-center">
                                <span className="mr-2">
                                  <CurrencyFormatter
                                    amount={quotation.laborPrice}
                                  />{" "}
                                  VNĐ
                                </span>
                                {calculateOriginalPrice(
                                  quotation.laborPrice,
                                  quotation.laborDiscount
                                ) > quotation.laborPrice && (
                                  <span className="line-through text-gray-500">
                                    <CurrencyFormatter
                                      amount={calculateOriginalPrice(
                                        quotation.laborPrice,
                                        quotation.laborDiscount
                                      )}
                                    />{" "}
                                    VNĐ
                                  </span>
                                )}
                              </div>
                            ) : (
                              "N/A"
                            )}
                            {quotation.laborPrice > 0 &&
                              quotation.laborDiscount > 0 && (
                                <div className="text-red-500">
                                  {`(-${Math.abs(quotation.laborDiscount)}%)`}
                                </div>
                              )}
                          </td>

                          <td className="p-3 text-sm text-red-500 font-semibold whitespace-nowrap text-center">
                            {quotation.total ? (
                              <span>
                                <CurrencyFormatter amount={quotation.total} />{" "}
                                VNĐ
                              </span>
                            ) : (
                              "N/A"
                            )}
                          </td>

                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            <span>
                              <QuotationStatusBadge
                                quotationStatus={quotation.quotationStatus}
                              />
                            </span>
                          </td>
                          <td className="flex flex-col justify-center items-center space-y-2 p-3 text-sm text-gray-700 text-center">
                            {quotation.quotationStatus !== 0 && (
                              <NavLink
                                to={`/customer/quotation-detail/${quotation.id}`}
                                className="text-blue-600 italic hover:text-black"
                              >
                                View Quotation Detail
                              </NavLink>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <QuotationOverviewGrid
                quotations={projectDetail.quotations}
                calculateOriginalPrice={calculateOriginalPrice}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
