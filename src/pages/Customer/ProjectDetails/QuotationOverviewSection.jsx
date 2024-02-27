import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";

import { getProjectByIdForCustomer } from "../../../constants/apiQuotationOfCustomer";

import { QuotationStatusBadge, CurrencyFormatter, LoadingOverlay } from "../../../components";


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
          <h1 className="text-xl font-semibold pb-5 uppercase">Quotation Overview</h1>

          <div className="p-5 h-auto ">
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
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
                        <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                          {quotation.rawMaterialPrice ? (
                            <div className="flex items-center justify-center">
                              <span className="mr-2">
                                <CurrencyFormatter
                                  amount={quotation.rawMaterialPrice}
                                />
                              </span>
                              <span className="line-through text-gray-500">
                                <CurrencyFormatter
                                  amount={calculateOriginalPrice(
                                    quotation.rawMaterialPrice,
                                    quotation.rawMaterialDiscount
                                  )}
                                />
                              </span>
                            </div>
                          ) : (
                            "N/A"
                          )}
                          {quotation.rawMaterialDiscount && (
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
                              <span className="line-through text-gray-500">
                                <CurrencyFormatter
                                  amount={calculateOriginalPrice(
                                    quotation.furniturePrice,
                                    quotation.furnitureDiscount
                                  )}
                                />
                              </span>
                            </div>
                          ) : (
                            "N/A"
                          )}
                          {quotation.furnitureDiscount &&
                            quotation.furniturePrice > 0 && (
                              <div className="text-red-500">
                                {`(-${Math.abs(quotation.furnitureDiscount)}%)`}
                              </div>
                            )}
                        </td>

                        <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                          {quotation.laborPrice ? (
                            <div className="flex items-center justify-center">
                              <span className="mr-2">
                                <CurrencyFormatter
                                  amount={quotation.laborPrice}
                                />
                              </span>
                              <span className="line-through text-gray-500">
                                <CurrencyFormatter
                                  amount={calculateOriginalPrice(
                                    quotation.laborPrice,
                                    quotation.laborDiscount
                                  )}
                                />
                              </span>
                            </div>
                          ) : (
                            "N/A"
                          )}
                          {quotation.laborDiscount && (
                            <div className="text-red-500">
                              {`(-${Math.abs(quotation.laborDiscount)}%)`}
                            </div>
                          )}
                        </td>

                        <td className="p-3 text-sm text-red-600 font-semibold whitespace-nowrap text-center">
                          {quotation.total ? (
                            <CurrencyFormatter amount={quotation.total} />
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                          <span>
                            {quotation.quotationStatus ? (
                              <QuotationStatusBadge
                                quotationStatus={quotation.quotationStatus}
                              />
                            ) : (
                              "N/A"
                            )}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-gray-700 text-center">
                          {quotation.quotationStatus !== 0 ? (
                            <NavLink
                              to={`/customer/quotation-detail/${quotation.id}`}
                            >
                              View Quotation Detail
                            </NavLink>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
