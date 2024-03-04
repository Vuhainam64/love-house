import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";

import { getProjectById } from "../../../../constants/apiQuotationOfStaff";

import {
  QuotationStatusBadge,
  CurrencyFormatter,
  LoadingOverlay,
} from "../../../../components";
import QuotationGrid from "./Grid/QuotationGrid";
import CreateDealByStaff from "../DealQuotationDetail/CreateDealByStaff";

export default function QuotationSection({ projectDetail }) {
  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };

  const calculateOriginalPrice = (price, discount) => {
    const discountPercentage = Math.abs(discount);
    const originalPrice = price / (1 - discountPercentage / 100);
    return originalPrice.toFixed(2);
  };

  return (
    <>
      <div className="flex-1 p-5">
        <h1 className="text-xl font-semibold  uppercase">Quotation Overview</h1>

        <div className="p-5 h-auto ">
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
                            <span className="mr-2">
                              <CurrencyFormatter
                                amount={quotation.rawMaterialPrice}
                              />
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
                                />
                              </span>
                            )}
                          </div>
                        ) : (
                          "N/A"
                        )}
                        {quotation.rawMaterialPrice > 0 &&
                          quotation.rawMaterialDiscount > 0 && (
                            <div className="text-red-500">
                              {`(-${Math.abs(quotation.rawMaterialDiscount)}%)`}
                            </div>
                          )}
                      </td>

                      <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {quotation.furniturePrice ? (
                          <div className="flex items-center justify-center">
                            <span className="mr-2">
                              <CurrencyFormatter
                                amount={quotation.furniturePrice}
                              />
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
                                />
                              </span>
                            )}
                          </div>
                        ) : (
                          "N/A"
                        )}
                        {quotation.furniturePrice > 0 &&
                          quotation.furnitureDiscount > 0 && (
                            <div className="text-red-500">
                              {`(-${Math.abs(quotation.furnitureDiscount)}%)`}
                            </div>
                          )}
                      </td>

                      <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {quotation.laborPrice > 0 ? (
                          <div className="flex items-center justify-center">
                            <span className="mr-2">
                              <CurrencyFormatter
                                amount={quotation.laborPrice}
                              />
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
                                />
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
                          <CurrencyFormatter amount={quotation.total} />
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
                      <td className="p-3 text-sm text-gray-700 text-center">
                        {quotation.quotationStatus === 0 && (
                          <NavLink
                            to={`/staff/manage-material-detail/${quotation.id}`}
                          >
                            <button className="bg-green-600 text-white p-2 rounded hover:bg-green-400">
                              Create Quotation Detail
                            </button>
                          </NavLink>
                        )}

                        {quotation.quotationStatus !== 0 && (
                          <NavLink
                            to={`/staff/quotation-detail/${quotation.id}`}
                          >
                            View Quotation Detail
                          </NavLink>
                        )}

                        {quotation.quotationStatus === 2 && (
                          <CreateDealByStaff
                            onModalClose={handleReloadContent}
                            quotationId={quotation.id}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <QuotationGrid
            quotations={projectDetail.quotations}
            calculateOriginalPrice={calculateOriginalPrice}
          />
        </div>
      </div>
    </>
  );
}
