import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getQuoteDetailForCustomer } from "../../../constants/apiQuotationOfCustomer";

import CustomerSidebar from "../../../components/Sidebar/CustomerSidebar";
import OverviewSection from "./OverviewSection";
import MaterialDetailSection from "./MaterialDetailSection";
import WorkerDetailSection from "./WorkerDetailSection";

export default function QuoteDetailsForCustomer() {
  return (
    <>
      <div className="flex">
        <CustomerSidebar />
        <div className="h-screen flex-1 p-7">
          <OverviewSection/>
          <MaterialDetailSection/>
          <WorkerDetailSection/>
        </div>
      </div>
    </>
  );
}
