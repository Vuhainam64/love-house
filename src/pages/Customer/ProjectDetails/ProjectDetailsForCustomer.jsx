import React from "react";

import { CustomerSidebar } from "../../../components";
import ProjecDetailsSection from "./ProjectDetailsSection";
import QuotationOverviewSection from "./QuotationOverviewSection";
import DealingSection from "./DealingSection";
import Contract from "./Contract";


export default function ProjectDetailsForCustomer() {
  return (
    <>
      <div className="flex">
        <CustomerSidebar />

        <div className="h-screen flex-1 p-7">
          <ProjecDetailsSection />
          <QuotationOverviewSection />
          <DealingSection/>
          <Contract/>
        </div>
      </div>
    </>
  );
}
