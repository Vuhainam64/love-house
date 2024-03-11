import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import OverviewSection from "./OverviewSection";
import MaterialDetailSection from "./MaterialDetailSection";
import WorkerDetailSection from "./WorkerDetailSection";
import DealingSection from "./DealingSection";
import QuotationDealing from "./QuotationDealing";
import { getProjectByIdForCustomer, getQuoteDetailForCustomer } from "../../../constants/apiQuotationOfCustomer";


export default function QuoteDetailsForCustomer() {
  const { id } = useParams();

  const [quotationDealing, setQuotationDealing] = useState([]);
  const [quoteDetail, setQuoteDetail] = useState([]);

  const [projectDetail, setProjectDetail] = useState([]);


  const fetchQuoteDetail = async () => {
    try {
      const data = await getQuoteDetailForCustomer(id);

      if (data.isSuccess) {
        setQuoteDetail(data.result.data);
        setQuotationDealing(data.result.data.quotationDealings);
        const projectID = data.result.data?.quotation?.projectId;
        const data2 = await getProjectByIdForCustomer(projectID);
        if (data2.isSuccess) {
          setProjectDetail(data.result.data);
        }
      }
    } catch (error) {
      console.error("Error fetching quote detail:", error);
    }
  };

  useEffect(() => {
    fetchQuoteDetail();
  }, [id]);
  return (
    <>
          <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            <OverviewSection
              quoteDetail={quoteDetail}
              projectDetail={projectDetail}
            />
            <QuotationDealing quotationDealing={quotationDealing} />
            <MaterialDetailSection quoteDetail={quoteDetail} />
            <WorkerDetailSection quoteDetail={quoteDetail} />
          </div>
        
    </>
  );
}
