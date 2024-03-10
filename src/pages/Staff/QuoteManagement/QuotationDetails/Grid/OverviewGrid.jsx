import React from "react";
import {
  CurrencyFormatter,
  QuotationStatusBadge,
} from "../../../../../components";

const OverviewGrid = ({ quoteDetail, calculateOriginalPrice }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      <div
        key={quoteDetail?.quotation?.id}
        className="bg-gray-50 border border-gray-300 space-y-4 rounded-lg shadow px-8 py-5"
      >
        <div className="text-right text-sm pb-2">
          <span className="">
            <QuotationStatusBadge
              quotationStatus={quoteDetail?.quotation?.quotationStatus}
            />
          </span>
        </div>

        <div className="flex justify-between">
        <span className=" text-gray-500">Raw Material Price:</span>
          <div className="flex">
            {quoteDetail?.quotation?.rawMaterialPrice ? (
              <div className="flex items-center justify-center ml-4">
                <span className="mr-2">
                  <CurrencyFormatter
                    amount={quoteDetail?.quotation?.rawMaterialPrice}
                  />{" "}VNĐ
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
                    />{" "}VNĐ
                  </span>
                )}
              </div>
            ) : (
              <span className="mx-2 text-gray-400">N/A</span>
            )}
            {quoteDetail?.quotation?.rawMaterialPrice > 0 &&
              quoteDetail?.quotation?.rawMaterialDiscount > 0 && (
                <div className="text-red-500 ml-2">
                  {`(-${Math.abs(
                    quoteDetail?.quotation?.rawMaterialDiscount
                  )}%)`}
                </div>
              )}
          </div>
        </div>

        <div className="flex justify-between">
        <span className=" text-gray-500">Furniture Price:</span>
          <div className="flex">
            {quoteDetail?.quotation?.furniturePrice ? (
              <div className="flex items-center justify-center ml-4">
                <span className="mr-2">
                  <CurrencyFormatter
                    amount={quoteDetail?.quotation?.furniturePrice}
                  />{" "}VNĐ
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
                    />{" "}VNĐ
                  </span>
                )}
              </div>
            ) : (
              <span className="mx-2 text-gray-400">N/A</span>
            )}
            {quoteDetail?.quotation?.furniturePrice > 0 &&
              quoteDetail?.quotation?.furnitureDiscount > 0 && (
                <div className="text-red-500 ml-2">
                  {`(-${Math.abs(quoteDetail?.quotation?.furnitureDiscount)}%)`}
                </div>
              )}
          </div>
        </div>

        <div className="flex justify-between">
        <span className=" text-gray-500">Labor Price:</span>
          <div className="flex">
            {quoteDetail?.quotation?.laborPrice > 0 ? (
              <div className="flex items-center justify-center ml-4">
                <span className="mr-2">
                  <CurrencyFormatter
                    amount={quoteDetail?.quotation?.laborPrice}
                  />{" "}VNĐ
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
                    />{" "}VNĐ
                  </span>
                )}
              </div>
            ) : (
              <span className="mx-2 text-gray-400">N/A</span>
            )}
            {quoteDetail?.quotation?.laborPrice > 0 &&
              quoteDetail?.quotation?.laborDiscount > 0 && (
                <div className="text-red-500 ml-2">
                  {`(-${Math.abs(quoteDetail?.quotation?.laborDiscount)}%)`}
                </div>
              )}
          </div>
        </div>

        <div className="flex justify-between">
        <span className="font-semibold text-gray-500">Total:</span>
          {quoteDetail?.quotation?.total ? (
            <div className="text-red-500 font-semibold mr-2">
              <CurrencyFormatter amount={quoteDetail?.quotation?.total} />{" "}VNĐ
            </div>
          ) : (
            <span className="mx-2 text-gray-400">N/A</span>
          )}
        </div>

        <div className="text-sm font-medium text-black text-right">
          {/* {quoteDetail?.quotation?.quotationStatus === 3 && (
            <button>Sign Contract</button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default OverviewGrid;
