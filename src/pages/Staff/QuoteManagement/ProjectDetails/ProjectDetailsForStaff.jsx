import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { DBHeader, LoadingOverlay, StaffSidebar } from "../../../../components";
import ProjectSection from "./ProjectSection";
import QuotationSection from "./QuotationSection";
import ContractSection from "./ContractSection";
import ContractSection2 from "./ContractSection2";
import DealQuotationSection from "./DealQuotationSection";

import { FaArrowLeft } from "react-icons/fa";
import { getProjectById } from "../../../../constants/apiQuotationOfStaff";

export default function ProjectDetails() {
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

  return (
    <>
      <LoadingOverlay loading={loading} />

      <div className="flex overflow-hidden">
        <StaffSidebar />
        <div className="h-screen overflow-y-auto flex-1">
          <DBHeader />
          <div className="">
            <ProjectSection projectDetail={projectDetail} />
            <QuotationSection projectDetail={projectDetail} />
            <DealQuotationSection projectDetail={projectDetail} />
            {/* <ContractSection/> */}
            <ContractSection2 />
          </div>
        </div>
      </div>
    </>
  );
}
