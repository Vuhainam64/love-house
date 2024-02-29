import React from "react";
import { NavLink } from "react-router-dom";
import {
  QuotationStatusBadge,
  CurrencyFormatter,
  DateFormatter,
} from "../../../../../components";

import { CgEnter } from "react-icons/cg";
import CreateDealByStaff from "../../DealQuotationDetail/CreateDealByStaff";

const QuotationGrid = ({ quotations, calculateOriginalPrice }) => {
  
  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };
  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {quotations &&
        quotations.map((quotation, index) => (
          <div
            key={quotation.id}
            className="bg-gray-50 border border-gray-300  space-y-4 rounded-lg shadow px-2 py-5"
          >
            <div className="flex items-center justify-between space-x-5 text-sm">
              <div className="flex">
                <div className="text-blue-500 font-bold hover:underline mr-2">
                  #{index + 1}
                </div>
                <div className="text-gray-500">
                  <DateFormatter dateString={quotation.createDate} />
                </div>
              </div>

              <div>
                <span>
                  <QuotationStatusBadge
                    quotationStatus={quotation.quotationStatus}
                  />
                </span>
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-700">
              Raw Material Price:
              <div className="flex">
                {quotation.rawMaterialPrice ? (
                  <div className="flex items-center justify-center ml-4">
                    <span className="mr-2">
                      <CurrencyFormatter amount={quotation.rawMaterialPrice} />
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

            <div className="flex justify-between text-sm text-gray-700">
              Furniture Price:
              {quotation.furniturePrice ? (
                <div className="flex items-center justify-center ml-4">
                  <span className="mr-2">
                    <CurrencyFormatter amount={quotation.furniturePrice} />
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
                <span className="mx-2 text-gray-400">N/A</span>
              )}
              {quotation.furniturePrice > 0 &&
                quotation.furnitureDiscount > 0 && (
                  <div className="text-red-500 ml-4">
                    {`(-${Math.abs(quotation.furnitureDiscount)}%)`}
                  </div>
                )}
            </div>

            <div className="flex justify-between text-sm text-gray-700">
              Labor Price:
              <div className="flex">
                {quotation.laborPrice > 0 ? (
                  <div className="flex items-center justify-center ml-4">
                    <span className="mr-2">
                      <CurrencyFormatter amount={quotation.laborPrice} />
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
                  <span className="mx-2 text-gray-400">N/A</span>
                )}
                {quotation.laborPrice > 0 && quotation.laborDiscount > 0 && (
                  <div className="text-red-500 ml-4">
                    {`(-${Math.abs(quotation.laborDiscount)}%)`}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-700">
              <span className="font-semibold">Total:</span>
              {quotation.total ? (
                <div className="text-red-500 font-semibold mr-2">
                  <CurrencyFormatter amount={quotation.total} />
                </div>
              ) : (
                <span className="mx-2 text-gray-400">N/A</span>
              )}
            </div>

            <div className="text-sm font-medium text-black text-center mb-3">
              {quotation.quotationStatus === 0 && (
                <NavLink to={`/staff/manage-material-detail/${quotation.id}`}>
                  <button className="bg-green-600 text-white p-2 rounded hover:bg-green-400 my-3">
                    Create Quotation Detail
                  </button>
                </NavLink>
              )}

              {quotation.quotationStatus === 2 && (
                // <NavLink to={`/staff/manage-material-detail/${quotation.id}`}>
                //   <button className="bg-green-600 text-white p-2 rounded hover:bg-green-400 my-3">
                //     Create Quotation Detail
                //   </button>
                // </NavLink>
                <CreateDealByStaff onModalClose={handleReloadContent} />
              )}

              {quotation.quotationStatus !== 0 && (
                <NavLink to={`/staff/quotation-detail/${quotation.id}`}>
                  <div className="flex items-center justify-center text-green-600 hover:text-baseGreen">
                    View Quotation Detail <CgEnter size={25} className="ml-2" />
                  </div>
                </NavLink>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default QuotationGrid;
