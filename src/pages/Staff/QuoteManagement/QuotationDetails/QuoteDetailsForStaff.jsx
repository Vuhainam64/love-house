import React, { useEffect, useState } from "react";

import { DBHeader, LoadingOverlay, StaffSidebar } from "../../../../components";
import Overview from "./Overview";
import Material from "./Material";
import Topbar from "../../../../components/QuotationComponent/Topbar/Topbar";
import Worker from "./Worker";
import { useParams } from "react-router-dom";
import { getQuotationById } from "../../../../constants/apiQuotationOfStaff";

export default function QuoteDetailsForStaff() {
  const { id } = useParams();
  const [quoteDetail, setQuoteDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuoteDetail = async () => {
    try {
      const data = await getQuotationById(id);

      if (data && data.result) {
        setQuoteDetail(data.result.data);
        setLoading(false);
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
      <LoadingOverlay loading={loading} />

      <div className="flex overflow-hidden">
        <StaffSidebar />
        <div className="h-screen overflow-y-auto flex-1">
          {/* <Topbar/> */}
          <DBHeader />
          <div className="">
            <Overview quoteDetail={quoteDetail} />
            <Material quoteDetail={quoteDetail} />
            <Worker quoteDetail={quoteDetail} />
          </div>
        </div>
      </div>
    </>
  );
}
