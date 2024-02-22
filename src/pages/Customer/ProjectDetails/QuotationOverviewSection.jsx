import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";

import { getProjectByIdForCustomer } from "../../../constants/apiQuotationOfCustomer";

import QuotationStatusBadge from "../../../components/QuotationComponent/Status/QuotationStatusBadge";
import CurrencyFormatter from "../../../components/Common/CurrencyFormatter";

export default function QuotationOverviewSection() {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState({});
  const navigate = useNavigate();

  const fetchProjectDetail = async () => {
    try {
      const data = await getProjectByIdForCustomer(id);
      console.log("API Data:", data);
      if (data && data.result) {
        setProjectDetail(data.result.data);
        //setLoading(false);
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
              <tr
                key={projectDetail.id}
                className="bg-white text-black text-left"
              >
                <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {projectDetail?.quotations?.[0]?.rawMaterialPrice ? (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">
                        <CurrencyFormatter
                          amount={
                            projectDetail?.quotations?.[0]?.rawMaterialPrice
                          }
                        />
                      </span>
                      <span className="line-through text-gray-500">
                        <CurrencyFormatter
                          amount={calculateOriginalPrice(
                            projectDetail?.quotations?.[0]?.rawMaterialPrice,
                            projectDetail?.quotations?.[0]?.rawMaterialDiscount
                          )}
                        />
                      </span>
                    </div>
                  ) : (
                    "N/A"
                  )}
                  {projectDetail?.quotations?.[0]?.rawMaterialDiscount && (
                    <div className="text-red-500">
                      {`(-${Math.abs(
                        projectDetail?.quotations?.[0]?.rawMaterialDiscount
                      )}%)`}
                    </div>
                  )}
                </td>

                <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {projectDetail?.quotations?.[0]?.furniturePrice ? (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">
                        <CurrencyFormatter
                          amount={
                            projectDetail?.quotations?.[0]?.furniturePrice
                          }
                        />
                      </span>
                      <span className="line-through text-gray-500">
                        <CurrencyFormatter
                          amount={calculateOriginalPrice(
                            projectDetail?.quotations?.[0]?.furniturePrice,
                            projectDetail?.quotations?.[0]?.furnitureDiscount
                          )}
                        />
                      </span>
                    </div>
                  ) : (
                    "N/A"
                  )}
                  {projectDetail?.quotations?.[0]?.furnitureDiscount && (
                    <div className="text-red-500">
                      {`(-${Math.abs(
                        projectDetail?.quotations?.[0]?.furnitureDiscount
                      )}%)`}
                    </div>
                  )}
                </td>

                <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {projectDetail?.quotations?.[0]?.laborPrice ? (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">
                        <CurrencyFormatter
                          amount={projectDetail?.quotations?.[0]?.laborPrice}
                        />
                      </span>
                      <span className="line-through text-gray-500">
                        <CurrencyFormatter
                          amount={calculateOriginalPrice(
                            projectDetail?.quotations?.[0]?.laborPrice,
                            projectDetail?.quotations?.[0]?.laborDiscount
                          )}
                        />
                      </span>
                    </div>
                  ) : (
                    "N/A"
                  )}
                  {projectDetail?.quotations?.[0]?.laborDiscount && (
                    <div className="text-red-500">
                      {`(-${Math.abs(
                        projectDetail?.quotations?.[0]?.laborDiscount
                      )}%)`}
                    </div>
                  )}
                </td>

                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {projectDetail?.quotations?.[0]?.total ? (
                    <CurrencyFormatter
                      amount={projectDetail?.quotations?.[0]?.total}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  <span>
                    {projectDetail?.quotations?.[0]?.quotationStatus ? (
                      <QuotationStatusBadge
                        quotationStatus={
                          projectDetail?.quotations?.[0]?.quotationStatus
                        }
                      />
                    ) : (
                      "N/A"
                    )}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700 text-center">
                  {projectDetail?.quotations?.[0]?.quotationStatus === 1 ? (
                    <NavLink
                      to={`/customer/quotation-detail/${projectDetail?.quotations?.[0]?.id}`}
                    >
                      View Quotation Detail
                    </NavLink>
                  ) : (
                    "N/A"
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
