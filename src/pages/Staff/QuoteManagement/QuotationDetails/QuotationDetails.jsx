import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getQuoteDetailByQuoteId,
  publicQuotationForCustomer,
  getQuotationById,
} from "../../../../constants/apiQuotationOfStaff";
import { alert } from "../../../../components/Alert/Alert";

import StaffSidebar from "../../../../components/Sidebar/StaffSidebar";
import FormCreateMaterialDetail from "./Manage/FormCreateMaterialDetail";
import FormUpdateMaterialDetail from "./Manage/FormUpdateMaterialDetail";
import DeleteMaterialDetail from "./Manage/DeleteMaterialDetail";
import CurrencyFormatter from "../../../../components/Common/CurrencyFormatter";
import LoadingOverlay from "../../../../components/Loading/LoadingOverlay";

export default function QuotationDetails() {
  const { id } = useParams();
  const [quote, setQuote] = useState({});
  const [quoteDetail, setQuoteDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadContent, setReloadContent] = useState(false);
  

  const fetchQuotation = async () => {
    try {
      const data = await getQuotationById(id);

      if (data && data.result) {
        setQuote(data.result.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching quote detail:", error);
    }
  };

  const fetchQuoteDetail = async () => {
    try {
      const data = await getQuoteDetailByQuoteId(id);

      if (data && data.result) {
        setQuoteDetail(data.result.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching quote detail:", error);
    }
  };

  useEffect(() => {
    fetchQuotation();
    fetchQuoteDetail();
  }, [id, reloadContent]);

  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };

  const handlePublicProject = async () => {
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
        text: "Do you want to public quotation detail for customer?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, public it",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
        focusConfirm: false,
      });

      if (result.isConfirmed) {
        const data = await publicQuotationForCustomer(id);
        console.log("check data: ", data);
        handleReloadContent();
        alert.alertSuccessWithTime(
          "Public Quote detail Successfully!",
          "",
          2000,
          "25",
          () => {}
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        alert.alertFailedWithTime("Failed to public", "", 2000, "25", () => {});
      }
    } catch (error) {
      alert.alertFailedWithTime(
        "Failed to public quote detail. ",
        "Please try again.",
        2000,
        "25",
        () => {}
      );
    }
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="flex">
        <StaffSidebar />

        <div className="h-screen flex-1 p-7">
          <h1 className="text-3xl font-semibold pb-4 pl-4">Quote Detail</h1>

          {quote?.quotation?.quotationStatus === 0 && (
            <div className="flex items-center">
              <div className="ml-4">
                <FormCreateMaterialDetail onModalClose={handleReloadContent} />
              </div>
              <button
                onClick={handlePublicProject}
                className="text-white bg-green-600 hover:bg-green-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center my-6 ml-4 "
              >
                Public Project
              </button>
            </div>
          )}

          <div className="p-5 h-screen bg-gray-100 ">
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                      No.
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                      Material name
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Unit
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Material type
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-right">
                      Quantity
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-right">
                      Total
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {quoteDetail &&
                    quoteDetail.map((item, index) => {
                      return (
                        <tr
                          key={item.id}
                          className="bg-white text-black text-left"
                        >
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            {item.material.name}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            {(() => {
                              switch (item.material.unitMaterial) {
                                case 0:
                                  return "Kg";
                                case 1:
                                  return "m³";
                                case 2:
                                  return "Bar";
                                case 3:
                                  return "Item";
                                default:
                                  return "";
                              }
                            })()}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            {item.material.materialType === 0
                              ? "Raw Material"
                              : "Funiture"}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                            {item.quantity}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                            <CurrencyFormatter amount={item.total} />
                          </td>
                          <td className="p-3 text-sm text-gray-700 text-center">
                            <div className="flex justify-center">
                              <div>
                                <FormUpdateMaterialDetail
                                  quoteDetail={item}
                                  onModalClose={handleReloadContent}
                                />
                              </div>

                              <div>
                                <DeleteMaterialDetail
                                  quoteDetail={item}
                                  onDelete={handleReloadContent}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
