import React from "react";

import { CustomerSidebar, DBHeader } from "../../../components";
import OverviewSection from "./OverviewSection";
import MaterialDetailSection from "./MaterialDetailSection";
import WorkerDetailSection from "./WorkerDetailSection";
import DealingSection from "./DealingSection";

export default function QuoteDetailsForCustomer() {
  return (
    <>
      <div className="flex overflow-hidden">
        <CustomerSidebar />
        <div className="h-screen overflow-y-auto flex-1 ">
          <DBHeader />
          <div>
            <OverviewSection />
            <DealingSection />
            <MaterialDetailSection />
            <WorkerDetailSection />
          </div>
        </div>
      </div>
    </>
  );
}
