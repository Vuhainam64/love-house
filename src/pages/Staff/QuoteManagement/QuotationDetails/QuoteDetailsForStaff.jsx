import React from "react";

import { DBHeader, StaffSidebar } from "../../../../components";
import Overview from "./Overview";
import Material from "./Material";
import Topbar from "../../../../components/QuotationComponent/Topbar/Topbar";
import Worker from "./Worker";

export default function QuoteDetailsForStaff() {
  return (
    <>
      <div className="flex overflow-hidden">
        <StaffSidebar />
        <div className="h-screen overflow-y-auto flex-1">
          {/* <Topbar/> */}
          <DBHeader />
          <div className="">
            <Overview />
            <Material />
            <Worker />
          </div>
        </div>
      </div>
    </>
  );
}
