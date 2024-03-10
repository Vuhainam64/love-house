import React from "react";
import StatsGrid from "./StatsGrid";
import Chart from "./Chart";

function AdminDashboard() {
  return (
    <>
      <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <div className="-z-50">
          <StatsGrid />
          <Chart />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
