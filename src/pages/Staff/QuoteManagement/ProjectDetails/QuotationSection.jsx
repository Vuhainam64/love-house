import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";

import { getProjectById } from "../../../../constants/apiQuotationOfStaff";

import QuotationStatusBadge from "../../../../components/QuotationComponent/Status/QuotationStatusBadge";
import CurrencyFormatter from "../../../../components/Common/CurrencyFormatter";
import LoadingOverlay from "../../../../components/Loading/LoadingOverlay";

export default function QuotationSection() {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reloadContent, setReloadContent] = useState(false);

  const fetchProjectDetail = async () => {
    try {
      const data = await getProjectById(id);
      console.log('Fetched data:', data);
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
  }, [id, reloadContent]);
  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };

  const calculateOriginalPrice = (price, discount) => {
    const discountPercentage = Math.abs(discount);
    const originalPrice = price / (1 - discountPercentage / 100);
    return originalPrice.toFixed(2);
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
      <h1 className="text-2xl font-semibold pb-5">Quotation Overview</h1>

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
                  <tr key={quotation.id} className="bg-white text-black text-left">
                    <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      {quotation.rawMaterialPrice ? (
                        <div className="flex items-center justify-center">
                          <span className="mr-2">
                            <CurrencyFormatter amount={quotation.rawMaterialPrice} />
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
                            <CurrencyFormatter amount={quotation.furniturePrice} />
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
                      {quotation.furnitureDiscount && quotation.furniturePrice > 0 && (
                        <div className="text-red-500">
                          {`(-${Math.abs(quotation.furnitureDiscount)}%)`}
                        </div>
                      )}
                    </td>

                    <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      {quotation.laborPrice >0  ? (
                        <div className="flex items-center justify-center">
                          <span className="mr-2">
                            <CurrencyFormatter amount={quotation.laborPrice} />
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

                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      {quotation.total ? (
                        <CurrencyFormatter amount={quotation.total} />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <span>
                        <QuotationStatusBadge quotationStatus={quotation.quotationStatus} />
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 text-center">
                      <NavLink to={`/staff/quotation-detail/${quotation.id}`}>
                        {quotation.quotationStatus === 0
                          ? "Create Quotation Detail"
                          : "View Quotation Detail"}
                      </NavLink>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
