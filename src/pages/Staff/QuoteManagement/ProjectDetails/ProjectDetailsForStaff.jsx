import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProjectById } from "../../../../constants/apiQuotationOfStaff";

import StaffSidebar from "../../../../components/Sidebar/StaffSidebar";
import ProjectSection from "./ProjectSection";
import QuotationSection from "./QuotationSection";
import ContractSection from "./ContractSection";
import ContractSection2 from "./ContractSection2";

export default function ProjectDetails() {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState({});

  const fetchProjectDetail = async () => {
    try {
      const data = await getProjectById(id);

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


  return (
    <>
      <div className="flex">
        <StaffSidebar />
        <div className="h-screen flex-1 p-7">
        <ProjectSection/>
        <QuotationSection/>
        {/* <ContractSection/> */}
        <ContractSection2/>
        </div>
       
{/* 
        <div className="h-screen flex-1 p-7">
          <h1 className="text-2xl font-semibold pb-5">Project Detail</h1>

          <div className="p-5 h-screen bg-gray-100 ">
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                      Description
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                      Construction Type
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
                  <tr
                    key={projectDetail.id}
                    className="bg-white text-black text-left"
                  >
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {`Floors: ${projectDetail?.project?.numOfFloor}, Area: ${projectDetail?.project?.area}`}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      {projectDetail?.project?.constructionType === 0
                        ? "Rough"
                        : "Completed"}
                    </td>
                    <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      {formatCurrency(
                        projectDetail?.quotations?.[0]?.rawMaterialPrice
                      )}
                    </td>
                    <td className=" w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      {formatCurrency(
                        projectDetail?.quotations?.[0]?.furniturePrice
                      )}
                    </td>
                    <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      {formatCurrency(
                        projectDetail?.quotations?.[0]?.laborPrice
                      )}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <span>
                        {formatCurrency(projectDetail?.quotations?.[0]?.total)}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <QuotationStatusBadge
                        quotationStatus={
                          projectDetail?.quotations?.[0]?.quotationStatus
                        }
                      />
                    </td>
                    <td className="p-3 text-sm text-gray-700 text-center"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
