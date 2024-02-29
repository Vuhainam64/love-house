import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";

import { getProjectByIdForCustomer } from "../../../constants/apiQuotationOfCustomer";

import {
  QuotationStatusBadge,
  CurrencyFormatter,
  LoadingOverlay,
  DateFormatter,
} from "../../../components";
import QuotationGrid from "../../Staff/QuoteManagement/ProjectDetails/Grid/QuotationGrid";
import { CgEnter } from "react-icons/cg";
export default function QuotationOverviewSection() {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchProjectDetail = async () => {
    try {
      const data = await getProjectByIdForCustomer(id);
      console.log("API Data:", data);
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

  return (
    <>
      {projectDetail.quotations?.length > 0 && (
        <>
          <LoadingOverlay loading={loading} />
          <div className="flex-1 p-5 pt-36">
            <h1 className="text-xl font-semibold uppercase">
              Quotation Overview
            </h1>

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
                            {/* {quotation.quotationStatus === 0 && (
                              <NavLink
                                to={`/staff/manage-material-detail/${quotation.id}`}
                              >
                                <button className="bg-green-600 text-white p-2 rounded hover:bg-green-400">
                                  Create Quotation Detail
                                </button>
                              </NavLink>
                            )} */}

                            {quotation.quotationStatus !== 0 && (
                              <NavLink
                                to={`/customer/quotation-detail/${quotation.id}`}
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

              <div className="grid grid-cols-1 gap-4 md:hidden">
                {projectDetail.quotations &&
                  projectDetail.quotations.map((quotation, index) => (
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
                            <span className="mx-2 text-gray-400">N/A</span>
                          )}
                          {quotation.rawMaterialPrice > 0 &&
                            quotation.rawMaterialDiscount > 0 && (
                              <div className="text-red-500 ml-4">
                                {`(-${Math.abs(
                                  quotation.rawMaterialDiscount
                                )}%)`}
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="flex justify-between text-sm text-gray-700">
                        Furniture Price:
                        {quotation.furniturePrice ? (
                          <div className="flex items-center justify-center ml-4">
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
                            <span className="mx-2 text-gray-400">N/A</span>
                          )}
                          {quotation.laborPrice > 0 &&
                            quotation.laborDiscount > 0 && (
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

                      <div className="text-sm font-medium text-black text-right">
                        {/* {quotation.quotationStatus === 0 && (
                          <NavLink
                            to={`/staff/manage-material-detail/${quotation.id}`}
                          >
                            <button className="bg-green-600 text-white p-2 rounded hover:bg-green-400 mt-3">
                              Create Quotation Detail
                            </button>
                          </NavLink>
                        )} */}

                        {quotation.quotationStatus !== 0 && (
                          <NavLink
                            to={`/customer/quotation-detail/${quotation.id}`}
                          >
                            <div className="flex items-center justify-center text-green-600 hover:text-baseGreen">
                              View Quotation Detail{" "}
                              <CgEnter size={25} className="ml-2" />
                            </div>
                          </NavLink>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
