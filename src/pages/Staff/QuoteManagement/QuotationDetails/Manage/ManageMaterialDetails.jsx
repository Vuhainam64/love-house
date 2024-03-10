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

  return (
    <>
      <LoadingOverlay loading={loading} />
      
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
       
    </>
  );
}
