import React from "react";

import { CustomerSidebar, DBHeader } from "../../../components";
import ProjecDetailsSection from "./ProjectDetailsSection";
import QuotationOverviewSection from "./QuotationOverviewSection";
import DealingSection from "./DealingSection";
import Contract from "./Contract";

export default function ProjectDetailsForCustomer() {
  return (
    <>
      <div className="flex overflow-hidden">
        <CustomerSidebar />

        <div className="h-screen overflow-y-auto flex-1 ">
          <DBHeader />
          <div>
            <ProjecDetailsSection />
            <QuotationOverviewSection />
            {/* <DealingSection /> */}
            <Contract />
          </div>
        </div>
      </div>
    </>
  );
}
