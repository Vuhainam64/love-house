import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getQuoteDetailForCustomer,
  dealQuotation,
  getProjectByIdForCustomer,
} from "../../../constants/apiQuotationOfCustomer";

import { alert } from "../../../components/Alert/Alert";

import {
  QuotationStatusBadge,
  CurrencyFormatter,
  LoadingOverlay,
} from "../../../components";

import DealForm from "../DealQuotation/DealForm";
import SignContractForm from "../Contract/SignContractForm";
import { toast } from "react-toastify";

export default function OverviewSection() {
  const { id } = useParams();
  const [quoteDetail, setQuoteDetail] = useState([]);
  const [reloadContent, setReloadContent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projectDetail, setProjectDetail] = useState({});

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

  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };

  const fetchProjectDetail = async () => {
    try {
      const projectID = quoteDetail?.quotation?.projectId;
      const data = await getProjectByIdForCustomer(projectID);
console.log("check nè: ", data)
      if (data && data.result) {
        setProjectDetail(data.result.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching project detail:", error);
    }
  };

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  const calculateOriginalPrice = (price, discount) => {
    const discountPercentage = Math.abs(discount);
    const originalPrice = price / (1 - discountPercentage / 100);
    return originalPrice;
  };

  const onDelete = () => {
    // Logic for deleting or handling something
    console.log("onDelete function called");
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
        console.log("Confirming quotation with id:", id);
        const result = await dealQuotation({ quotationId: id, status: true });
        if (result.isSuccess) {
          console.log("Confirmation successful!");
          alert.alertSuccessWithTime(
            "Confirm quotation successfully!",
            "",
            2000,
            "25",
            () => {}
          );
        } else {
          for (var i = 0; i < result.messages.length; i++) {
            toast.error(result.messages[i]);
          }
        }
        setReloadContent(true);
      }
    } catch (error) {
      console.error("Error confirming quotation:", error);
      alert.alertFailedWithTime(
        "Failed to delete quote detail. Please try again.",
        "",
        2000,
        "25",
        () => {}
      );
    }
  };

  const handleCancelQuotation = async () => {
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
        text: "Do you want to cancel this quote?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, I agree",
        cancelButtonText: "No",
        reverseButtons: true,
        focusConfirm: false,
      });

      if (result.isConfirmed) {
        console.log("Cancel quotation with id:", id);
        const result = await dealQuotation({ quotationId: id, status: false });
        if (result.isSuccess) {
          console.log("Cancel successful!");
          alert.alertSuccessWithTime(
            "Cancel quotation successfully!",
            "",
            2000,
            "25",
            () => {}
          );
        } else {
          for (var i = 0; i < result.messages.length; i++) {
            toast.error(result.messages[i]);
          }
        }
        setReloadContent(true);
      }
    } catch (error) {
      console.error("Error cancel quotation:", error);
      alert.alertFailedWithTime(
        "Failed to cancel quotation. Please try again.",
        "",
        2000,
        "25",
        () => {}
      );
    }
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
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
                  {quoteDetail?.quotationDealings &&
                    quoteDetail.quotationDealings.length === 0 && (
                      <>
                        {quoteDetail?.quotation?.quotationStatus === 1 && (
                          <>
                            <button
                              className="bg-baseGreen text-white rounded-lg p-2 mb-2 font-semibold"
                              onClick={handleConfirmQuotation}
                            >
                              Confirm Quotation
                            </button>
                            <button
                              className="bg-red-500 text-white rounded-lg p-2 mb-2 font-semibold"
                              onClick={handleCancelQuotation}
                            >
                              Cancel Quotation
                            </button>
                            {/* <DealForm onModalClose={handleReloadContent} /> */}
                          </>
                        )}
                      </>
                    )}

                  {quoteDetail?.quotation?.quotationStatus === 3 &&   (
                    // <button>Sign Contract</button>
                    <SignContractForm onModalClose={handleReloadContent} />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

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

            <div className="flex justify-between text-sm text-gray-700">
              Raw Material Price:
              <div className="flex">
                {quoteDetail?.quotation?.rawMaterialPrice ? (
                  <div className="flex items-center justify-center ml-4">
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

            <div className="flex justify-between text-sm text-gray-700">
              Furniture Price:
              <div className="flex">
                {quoteDetail?.quotation?.furniturePrice ? (
                  <div className="flex items-center justify-center ml-4">
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
                  <span className="mx-2 text-gray-400">N/A</span>
                )}
                {quoteDetail?.quotation?.furniturePrice > 0 &&
                  quoteDetail?.quotation?.furnitureDiscount > 0 && (
                    <div className="text-red-500 ml-2">
                      {`(-${Math.abs(
                        quoteDetail?.quotation?.furnitureDiscount
                      )}%)`}
                    </div>
                  )}
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-700">
              Labor Price:
              <div className="flex">
                {quoteDetail?.quotation?.laborPrice > 0 ? (
                  <div className="flex items-center justify-center ml-4">
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

            <div className="flex justify-between text-sm text-gray-700">
              <span className="font-semibold">Total:</span>
              {quoteDetail?.quotation?.total ? (
                <div className="text-red-500 font-semibold mr-2">
                  <CurrencyFormatter amount={quoteDetail?.quotation?.total} />
                </div>
              ) : (
                <span className="mx-2 text-gray-400">N/A</span>
              )}
            </div>

            <div className="text-sm font-medium text-black text-right space-x-2">
              {quoteDetail?.quotationDealings &&
                quoteDetail.quotationDealings.length === 0 && (
                  <>
                    {quoteDetail?.quotation?.quotationStatus === 1 && (
                      <>
                        <button
                          className="bg-red-500 text-white rounded-lg p-2 mb-2 font-semibold"
                          onClick={handleCancelQuotation}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-baseGreen text-white rounded-lg p-2 mb-2 font-semibold"
                          onClick={handleConfirmQuotation}
                        >
                          Confirm
                        </button>

                        {/* <DealForm onModalClose={handleReloadContent} /> */}
                      </>
                    )}
                  </>
                )}

              {quoteDetail?.quotation?.quotationStatus === 3 && (
                <>
                  {projectDetail?.contract?.contractStatus === 0 ? (
                    <span>Waiting</span>
                  ) : (
                    <SignContractForm onModalClose={handleReloadContent} />
                  )}
                </>
                // <button>Sign Contract</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
