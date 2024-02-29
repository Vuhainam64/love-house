import React from "react";
import { NavLink } from "react-router-dom";

import { DBHeader, StaffSidebar } from "../../../../components";
import ProjectSection from "./ProjectSection";
import QuotationSection from "./QuotationSection";
import ContractSection from "./ContractSection";
import ContractSection2 from "./ContractSection2";
import DealQuotationSection from "./DealQuotationSection";

import { FaArrowLeft } from "react-icons/fa";

export default function ProjectDetails() {
  return (
    <>
      <div className="flex overflow-hidden">
        <StaffSidebar />
        <div className="h-screen overflow-y-auto flex-1">
          <DBHeader />
          <div className="">
            <ProjectSection />
            <QuotationSection />
            <DealQuotationSection />
            {/* <ContractSection/> */}
            <ContractSection2 />
          </div>
        </div>
      </div>
    </>
  );
}
