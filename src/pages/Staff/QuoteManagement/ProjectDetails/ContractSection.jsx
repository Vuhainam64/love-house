import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProjectById } from "../../../../constants/apiQuotationOfStaff";

import CurrencyFormatter from "../../../../components/Common/CurrencyFormatter";
import ContractStatusBadge from "../../../../components/QuotationComponent/Status/ContractStatusBadge";
import LoadingOverlay from "../../../../components/Loading/LoadingOverlay";

export default function ContractSection() {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState({});
  const [loading, setLoading] = useState(true);

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
  }, [id]);

  const renderContractInfo = () => {
    const contractFields = [
      { label: "ID", key: "id" },
      { label: "Status", key: "contractStatus" },
      { label: "Total", key: "total" },
      { label: "Total Costs Incurred", key: "totalCostsIncurred" },
      { label: "Deposit", key: "deposit" },
      { label: "Content", key: "content" },
      { label: "Date Of Contract", key: "dateOfContract" },
      { label: "Start Date", key: "startDate" },
      { label: "End Date", key: "endDate" },
      { label: "Material Price", key: "materialPrice" },
      { label: "Labor Price", key: "laborPrice" },
      { label: "Furniture Price", key: "furniturePrice" },
    ];

    return (
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Field Name
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {contractFields.map((field) => (
            <tr key={field.key} className="bg-white text-black text-left">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {field.label}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap border-l border-gray-200 text-right">
                {/* {projectDetail?.contract?.[field.key]} */}
                {field.key === "total" ||
                field.key === "totalCostsIncurred" ||
                field.key === "deposit" ||
                field.key === "laborPrice" ||
                field.key === "furniturePrice" ||
                field.key === "materialPrice" ? (
                  <CurrencyFormatter
                    amount={projectDetail?.contract?.[field.key]}
                  />
                ) : (
                  field.key === "contractStatus" ? (
                    <ContractStatusBadge
                      contractStatus={projectDetail?.contract?.[field.key]}
                    />
                  ) : (
                    projectDetail?.contract?.[field.key]
                  )
                )}

                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <>
      <LoadingOverlay loading={loading} />
      <h1 className="text-2xl font-semibold pb-5">Contract</h1>
      <div className="p-5 h-auto">
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          {renderContractInfo()}
        </div>
      </div>
    </>
  );
}
