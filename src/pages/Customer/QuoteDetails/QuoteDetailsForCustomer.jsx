import React, { useEffect, useState } from "react";

import { CustomerSidebar, DBHeader, LoadingOverlay } from "../../../components";
import OverviewSection from "./OverviewSection";
import MaterialDetailSection from "./MaterialDetailSection";
import WorkerDetailSection from "./WorkerDetailSection";
import DealingSection from "./DealingSection";
import QuotationDealing from "./QuotationDealing";
import { getProjectByIdForCustomer, getQuoteDetailForCustomer } from "../../../constants/apiQuotationOfCustomer";
import { useParams } from "react-router-dom";

export default function QuoteDetailsForCustomer() {
  const { id } = useParams();

  const [quotationDealing, setQuotationDealing] = useState([]);
  const [quoteDetail, setQuoteDetail] = useState([]);

  const [projectDetail, setProjectDetail] = useState([]);
  const fetchQuoteDetail = async () => {
    try {
      const data = await getQuoteDetailForCustomer(id);

      console.log(data);
      if (data.isSuccess) {
        setQuoteDetail(data.result.data);
        setQuotationDealing(data.result.data.quotationDealings);
        const projectID = data.result.data?.quotation?.projectId;
        const data2 = await getProjectByIdForCustomer(projectID);
        if (data2.isSuccess) {
          setProjectDetail(data.result.data);
        }
      }
      console.log(loading);
    } catch (error) {
      console.error("Error fetching quote detail:", error);
    }
  };

  useEffect(() => {
    fetchQuoteDetail();
  }, [id]);
  return (
    <>
      <div className="flex overflow-hidden">
        <CustomerSidebar />
        <div className="h-screen overflow-y-auto flex-1 ">
          <DBHeader />
          <div>
            <OverviewSection
              quoteDetail={quoteDetail}
              projectDetail={projectDetail}
            />
            <QuotationDealing quotationDealing={quotationDealing} />
            <MaterialDetailSection quoteDetail={quoteDetail} />
            <WorkerDetailSection quoteDetail={quoteDetail} />
          </div>
        </div>
      </div>
    </>
  );
}
