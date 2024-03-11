import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { LoadingOverlay } from "../../../../components";
import ProjectSection from "./ProjectSection";
import QuotationSection from "./QuotationSection";
import ContractSection2 from "./ContractSection2";
import DealQuotationSection from "./DealQuotationSection";

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
      <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <ProjectSection projectDetail={projectDetail} />
        <QuotationSection projectDetail={projectDetail} />
        <DealQuotationSection projectDetail={projectDetail} />
        <ContractSection2 projectDetail={projectDetail} />
      </div>
    </>
  );
}
