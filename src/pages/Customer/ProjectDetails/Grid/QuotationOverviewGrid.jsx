import React from "react";
import { NavLink } from "react-router-dom";
import {
  QuotationStatusBadge,
  CurrencyFormatter,
  DateFormatter,
} from "../../../../components"


import { CgEnter } from "react-icons/cg";

function QuotationOverviewGrid({ quotations, calculateOriginalPrice }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:hidden mb-2">
    {quotations &&
      quotations.map((quotation, index) => (
        <div
          key={quotation.id}
          className="bg-gray-50 border border-gray-300  space-y-4 rounded-lg shadow px-8 py-4"
        >
          <div className="flex items-center justify-between space-x-5 text-sm">
            <div className="flex justify-center items-center">
              <div className="text-blue-500 font-bold hover:underline mr-4">
                #{index + 1}
              </div>
              <span>
                <QuotationStatusBadge
                  quotationStatus={quotation.quotationStatus}
                />
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className=" text-gray-500">Quote creation date:</span>
            <span className="text-blue-700 font-semibold">
              <DateFormatter dateString={quotation.createDate} />
            </span>
          </div>

          <div className="flex justify-between">
          <span className=" text-gray-500">Raw Material Price:</span>
           
            <div className="flex">
              {quotation.rawMaterialPrice ? (
                <div className="flex items-center justify-center ml-4">
                  <span className="mr-2">
                    <CurrencyFormatter amount={quotation.rawMaterialPrice} />{" "}VNĐ
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
                      />{" "}VNĐ
                    </span>
                  )}
                </div>
              ) : (
                <span className="mx-2 text-gray-400">N/A</span>
              )}
              {quotation.rawMaterialPrice > 0 &&
                quotation.rawMaterialDiscount > 0 && (
                  <div className="text-red-500 ml-4">
                    {`(-${Math.abs(quotation.rawMaterialDiscount)}%)`}
                  </div>
                )}
            </div>
          </div>

          <div className="flex justify-between">
          <span className=" text-gray-500">Furniture Price:</span>
            
            {quotation.furniturePrice ? (
              <div className="flex items-center justify-center ml-4">
                <span className="mr-2">
                  <CurrencyFormatter amount={quotation.furniturePrice} />{" "}VNĐ
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
                    />{" "}VNĐ
                  </span>
                )}
              </div>
            ) : (
              <span className="mx-2 text-gray-400">N/A</span>
            )}
            {quotation.furniturePrice > 0 &&
              quotation.furnitureDiscount > 0 && (
                <div className="text-red-500 ml-4">
                  {`(-${Math.abs(quotation.furnitureDiscount)}%)`}
                </div>
              )}
          </div>

          <div className="flex justify-between">
          <span className=" text-gray-500">Labor Price:</span>
            
            <div className="flex">
              {quotation.laborPrice > 0 ? (
                <div className="flex items-center justify-center ml-4">
                  <span className="mr-2">
                    <CurrencyFormatter amount={quotation.laborPrice} />{" "}VNĐ
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
                      />{" "}VNĐ
                    </span>
                  )}
                </div>
              ) : (
                <span className="mx-2 text-gray-400">N/A</span>
              )}
              {quotation.laborPrice > 0 && quotation.laborDiscount > 0 && (
                <div className="text-red-500 ml-4">
                  {`(-${Math.abs(quotation.laborDiscount)}%)`}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Total:</span>
            {quotation.total ? (
              <div className="text-red-500 font-semibold mr-2">
                <CurrencyFormatter amount={quotation.total} />{" "}VNĐ
              </div>
            ) : (
              <span className="mx-2 text-gray-400">N/A</span>
            )}
          </div>

          <div className="text-sm font-medium text-black text-center mb-3">
         

            {quotation.quotationStatus !== 0 && (
              <NavLink to={`/customer/quotation-detail/${quotation.id}`}>
                <div className="flex items-center justify-center text-green-600 hover:text-black italic">
                  View details <CgEnter size={25} className="ml-2" />
                </div>
              </NavLink>
            )}
          </div>
        </div>
      ))}
  </div>
  )
}

export default QuotationOverviewGrid