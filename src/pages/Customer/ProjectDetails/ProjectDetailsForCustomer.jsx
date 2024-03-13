import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProjectByIdForCustomer } from "../../../constants/apiQuotationOfCustomer";
import {
  LoadingOverlay,
  ProjectStatusBadge,
  DateFormatter,
} from "../../../components";

import ProjecDetailsSection from "./ProjectDetailsSection";
import QuotationOverviewSection from "./QuotationOverviewSection";
import DealingSection from "./DealingSection";
import Contract from "./Contract";

export default function ProjectDetailsForCustomer() {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProjectDetail = async () => {
    try {
      const data = await getProjectByIdForCustomer(id);

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
            <ProjecDetailsSection projectDetail={projectDetail}/>
            <QuotationOverviewSection projectDetail={projectDetail}/> 
            <Contract />
          </div>
        
    </>
  );
}
