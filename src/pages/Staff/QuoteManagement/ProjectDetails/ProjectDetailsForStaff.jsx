import React from "react";

import StaffSidebar from "../../../../components/Sidebar/StaffSidebar";
import ProjectSection from "./ProjectSection";
import QuotationSection from "./QuotationSection";
import ContractSection from "./ContractSection";
import ContractSection2 from "./ContractSection2";
import DealQuotationSection from "./DealQuotationSection";

export default function ProjectDetails() {
  return (
    <>
      <div className="flex">
        <StaffSidebar />
        <div className="h-screen flex-1 p-7">
          <ProjectSection />
          <QuotationSection />
          <DealQuotationSection />
          {/* <ContractSection/> */}
          <ContractSection2 />
        </div>
      </div>
    </>
  );
}
