import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getQuoteDetailByQuoteId,
  publicQuotationForCustomer,
  getQuotationById,
  getProjectById,
} from "../../../../../constants/apiQuotationOfStaff";
import { alert } from "../../../../../components/Alert/Alert";

import {
  StaffSidebar,
  CurrencyFormatter,
  LoadingOverlay,
  DBHeader,
} from "../../../../../components";
import FormCreateMaterialDetail from "./FormCreateMaterialDetail";
import FormUpdateMaterialDetail from "./FormUpdateMaterialDetail";
import DeleteMaterialDetail from "./DeleteMaterialDetail";
import InfoSection from "./InforSection";

import MaterialGrid from "../Grid/MaterialGrid";
import SendQuotationResult from "./SendQuotationResult";

export default function ManageMaterialDetails() {
  const { id } = useParams();
  const [quote, setQuote] = useState({});
  const [quoteDetail, setQuoteDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadContent, setReloadContent] = useState(false);
  const navigate = useNavigate();
  const [projectDetail, setProjectDetail] = useState({});

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

  // const handlePublicProject = async () => {
  //   try {
  //     const projectID = quote?.quotation?.projectId
  //     const projectDetailsResponse = await getProjectById(projectID);

  //     if (projectDetailsResponse && projectDetailsResponse.result) {
  //       const projectDetails = projectDetailsResponse.result.data;

  //       const constructionType = projectDetails.constructionType;

  //       if (constructionType === 1) {
  //         const quoteDetailsResponse = await getQuoteDetailByQuoteId(id);

  //         if (quoteDetailsResponse && quoteDetailsResponse.result) {
  //           const quoteDetails = quoteDetailsResponse.result.data;

  //           const hasLamp = quoteDetails.some(
  //             (item) => item.material.name === "Lamp"
  //           );

  //           if (!hasLamp) {
  //             alert.alertFailedWithTime(
  //               "Failed to send quotation results to customers ",
  //               "This is a completed project, please add interior materials",
  //               2000,
  //               "25",
  //               () => {}
  //             );
  //             return;
  //           }
  //         }
  //       }

  //       const swalWithBootstrapButtons = Swal.mixin({
  //         customClass: {
  //           confirmButton:
  //             "bg-green-500 hover:bg-green-600 text-white mx-3 px-4 py-2 rounded",
  //           cancelButton:
  //             "bg-red-500 hover:bg-red-600 text-white mx-3 px-4 py-2 rounded",
  //         },
  //         buttonsStyling: false,
  //       });

  //       const result = await swalWithBootstrapButtons.fire({
  //         title: "Are you sure?",
  //         text: "Do you want to send quotation results to customer?",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonText: "Yes, public it",
  //         cancelButtonText: "No, cancel",
  //         reverseButtons: true,
  //         focusConfirm: false,
  //       });

  //       if (result.isConfirmed) {
  //         const data = await publicQuotationForCustomer(id);

  //         if (data && data.isSuccess) {
  //           handleReloadContent();
  //           alert.alertSuccessWithTime(
  //             "Public Quote detail Successfully!",
  //             "",
  //             2000,
  //             "25",
  //             () => {}
  //           );

  //           navigate(`/staff/project-detail/${projectID}`);
  //         } else {
  //           alert.alertFailedWithTime(
  //             "Failed to send quotation results to customers",
  //             "This is a completed project, please add interior materials",
  //             2000,
  //             "25",
  //             () => {}
  //           );
  //         }
  //       } else {
  //         alert.alertFailedWithTime("Failed to send quotation results to customers", "", 2000, "25", () => {});
  //       }
  //     }
  //   } catch (error) {
  //     // Handle error
  //     alert.alertFailedWithTime("Failed to send quotation results to customers", "", 2000, "25", () => {});
  //   }
  // };

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="flex h-auto overflow-hidden">
        <StaffSidebar />

        <div className=" h-screen flex-1 ">
          <DBHeader />
          <h1 className="text-2xl font-semibold pb-2 mt-5 mb-5 pl-4 uppercase ">
            Quote Detail
          </h1>
          <div className=" sticky top-0  bg-white  overflow-hidden">
            <InfoSection />
          </div>

          {quote?.quotation?.rawMaterialPrice > 0 && (
            <div className="flex text-xl font-semibold pb-2 mt-5 pl-4 uppercase ">
              <span>Total:</span>
              <div className="ml-4 text-red-500">
                <CurrencyFormatter
                  amount={quote?.quotation?.rawMaterialPrice}
                />
              </div>
            </div>
          )}

          {quote?.quotation?.quotationStatus === 0 && (
            <div className="flex items-center">
              <div className="ml-4">
                <FormCreateMaterialDetail onModalClose={handleReloadContent} />
              </div>
              {/* <button
                onClick={handlePublicProject}
                className="text-white bg-green-600 hover:bg-green-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center my-6 ml-4 "
              >
                Public Project
              </button> */}
              <SendQuotationResult
                projectId={quote?.quotation?.projectId}
                quoteId={id}
                handleReloadContent={handleReloadContent}
              />
            </div>
          )}
          <div className="p-5 h-screen overflow-hidden">
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

                    {quote?.quotation?.quotationStatus === 0 && (
                      <th className=" p-3 text-sm font-semibold tracking-wide">
                        Action
                      </th>
                    )}
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

                          {quote?.quotation?.quotationStatus === 0 && (
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
                          )}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <MaterialGrid
              quote={quote}
              quoteDetail={quoteDetail}
              handleReloadContent={handleReloadContent}
            />
          </div>
        </div>
      </div>
    </>
  );
}
