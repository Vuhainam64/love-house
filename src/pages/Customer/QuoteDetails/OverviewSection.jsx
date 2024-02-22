import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getQuoteDetailForCustomer } from "../../../constants/apiQuotationOfCustomer";

import {alert} from "../../../components/Alert/Alert"

import QuotationStatusBadge from "../../../components/QuotationComponent/Status/QuotationStatusBadge";
import CurrencyFormatter from "../../../components/Common/CurrencyFormatter";
import DealForm from "../DealQuotation/DealForm";

export default function OverviewSection() {
  const { id } = useParams();
  const [quoteDetail, setQuoteDetail] = useState([]);

  const fetchQuoteDetail = async () => {
    try {
      const data = await getQuoteDetailForCustomer(id);

      if (data && data.result) {
        setQuoteDetail(data.result.data);
        //setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching quote detail:", error);
    }
  };

  useEffect(() => {
    fetchQuoteDetail();
  }, [id]);

  const calculateOriginalPrice = (price, discount) => {
    const discountPercentage = Math.abs(discount);
    const originalPrice = price / (1 - discountPercentage / 100);
    return originalPrice;
  };

  const handleConfirmQuotation = async () => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton:
            "bg-green-500 hover:bg-green-600 text-white mx-3 px-4 py-2 rounded",
          cancelButton:
            "bg-red-500 hover:bg-red-600 text-white mx-3 px-4 py-2 rounded",
        },
        buttonsStyling: false,
      });

      const result = await swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "Do you want to confirm this quote?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, I agree",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
        focusConfirm: false,
      });

      if (result.isConfirmed) {
        await dealQuotation(id);
        setReloadContent(true);
        alert.alertSuccessWithTime(
          "Confirm quotation successfully!",
          "",
          2000,
          "25",
          () => {}
        );
        onDelete();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        alert.alertFailedWithTime("Failed to confirm", "", 2000, "25", () => {});
      }
    } catch (error) {
      alert.alertFailedWithTime(
        "Failed to delete quote detail. Please try again.",
        "",
        2000,
        "25",
        () => {}
      );
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold pb-5">Overview</h1>
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
                    <span className=" line-through text-gray-500">
                      <CurrencyFormatter
                        amount={calculateOriginalPrice(
                          quoteDetail?.quotation?.rawMaterialPrice,
                          quoteDetail?.quotation?.rawMaterialDiscount
                        )}
                      />
                    </span>
                  </div>
                  <div className="text-red-500">
                    {`(-${Math.abs(
                      quoteDetail?.quotation?.rawMaterialDiscount
                    )}%)`}
                  </div>
                </td>

                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center">
                    <span className="mr-2">
                      <CurrencyFormatter
                        amount={quoteDetail?.quotation?.furniturePrice}
                      />
                    </span>
                    {quoteDetail?.quotation?.furniturePrice !== 0 && (
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
                  <div className="text-red-500">
                    {`(-${Math.abs(
                      quoteDetail?.quotation?.furnitureDiscount
                    )}%)`}
                  </div>
                </td>

                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center">
                    <span className="mr-2">
                      <CurrencyFormatter
                        amount={quoteDetail?.quotation?.laborPrice}
                      />
                    </span>
                    <span className=" line-through text-gray-500">
                      <CurrencyFormatter
                        amount={calculateOriginalPrice(
                          quoteDetail?.quotation?.laborPrice,
                          quoteDetail?.quotation?.laborDiscount
                        )}
                      />
                    </span>
                  </div>
                  <div className="text-red-500">
                    {`(-${Math.abs(quoteDetail?.quotation?.laborDiscount)}%)`}
                  </div>
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
                {quoteDetail?.quotation?.quotationStatus === 1 && (
                    <>
                      <button
                        className="bg-baseGreen text-white rounded-lg p-2 mb-2 font-semibold"
                        onClick={handleConfirmQuotation}
                      >
                        Confirm Quotation
                      </button>
                      <DealForm />
                    </>
                  )}
                  {quoteDetail?.quotation?.quotationStatus === 3 && (
                    <button>Sign Contract</button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
