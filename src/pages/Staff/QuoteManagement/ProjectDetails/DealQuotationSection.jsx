import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProjectById } from "../../../../constants/apiQuotationOfStaff";
import { LoadingOverlay } from "../../../../components";
import CreateDealByStaff from "../DealQuotationDetail/CreateDealByStaff";
import DealGrid from "./Grid/DealGrid";

export default function DealQuotationSection() {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [reloadContent, setReloadContent] = useState(false);

  const fetchProjectDetail = async () => {
    try {
      const data = await getProjectById(id);

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

  const renderCreateDealComponent = () => {
    const dealing = projectDetail?.quotationDealings?.[0];
    const quotation = projectDetail?.quotations?.[0];
  
    return (
      !(
        dealing &&
        quotation &&
        dealing.materialDiscount <= quotation.rawMaterialDiscount &&
        dealing.furnitureDiscount <= quotation.furnitureDiscount &&
        dealing.laborDiscount <= quotation.laborDiscount
      ) && <CreateDealByStaff onModalClose={handleReloadContent} />
    );
  };

  return (
    <>
      {projectDetail.quotationDealings?.length > 0 && (
        <>
          <LoadingOverlay loading={loading} />
          <h1 className="text-xl font-semibold uppercase pl-5">Quotation Dealing</h1>
          <div className="p-5 h-auto ">
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                      Material Discount
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                      Furniture Discount
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                      Labor Discount
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                      Description
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr
                    key={projectDetail.id}
                    className="bg-white text-black text-left"
                  >
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <div className="text-red-500">
                        {`-${Math.abs(
                          projectDetail?.quotationDealings[0]?.materialDiscount
                        )}%`}
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <div className="text-red-500">
                        {`-${Math.abs(
                          projectDetail?.quotationDealings[0]?.furnitureDiscount
                        )}%`}
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <div className="text-red-500">
                        {`-${Math.abs(
                          projectDetail?.quotationDealings[0]?.laborDiscount
                        )}%`}
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700 text-center">
                      {projectDetail?.quotationDealings[0]?.description}
                    </td>
                    <td className="p-3 text-sm text-gray-700 text-center">
                      {renderCreateDealComponent()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <DealGrid projectDetail={projectDetail}  handleReloadContent={handleReloadContent}/>
          </div>
        </>
      )}
    </>
  );
}
