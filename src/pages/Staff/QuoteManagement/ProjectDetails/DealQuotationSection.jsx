import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProjectById } from "../../../../constants/apiQuotationOfStaff";
import { LoadingOverlay } from "../../../../components";
import CreateDealByStaff from "../DealQuotationDetail/CreateDealByStaff";

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
    if (
      projectDetail.quotationDealings &&
      projectDetail.quotationDealings.length > 0 &&
      projectDetail.quotations &&
      projectDetail.quotations.length > 0
    ) {
      const dealing = projectDetail.quotationDealings[0];
      const quotation = projectDetail.quotations[0];

      // Check if discounts are less than or equal in both quotations and dealings
      if (
        dealing.materialDiscount <= quotation.rawMaterialDiscount &&
        dealing.furnitureDiscount <= quotation.furnitureDiscount &&
        dealing.laborDiscount <= quotation.laborDiscount
      ) {
        
        return null;
      }
    }
    
    return <CreateDealByStaff onModalClose={handleReloadContent} />;
    
  };

  return (
    <>
      {
        projectDetail.quotationDealings?.length > 0 && (
          <>
          <LoadingOverlay loading={loading} />
            <h1 className="text-xl font-semibold pb-5 pt-12 uppercase">
              Quotation Dealing
            </h1>
            <div className="px-5 pb-5 h-auto ">
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
                            projectDetail?.quotationDealings[0]
                              ?.materialDiscount
                          )}%`}
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        <div className="text-red-500">
                          {`-${Math.abs(
                            projectDetail?.quotationDealings[0]
                              ?.furnitureDiscount
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
                        {/* <CreateDealByStaff onModalClose={handleReloadContent}/> */}
                        {renderCreateDealComponent()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
    </>
  );
}
