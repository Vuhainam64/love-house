import { Outlet } from "react-router";
import { DBFooter, DBHeader } from "../../components";
import StaffSidebar from "../../components/Sidebar/StaffSidebar";
import { useState } from "react";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex">
      <div>
        <StaffSidebar />
      </div>
      <div className="flex-col w-full">
        <div className="w-full">
          <div className="sticky top-0 z-50 w-full">
            <DBHeader setIsOpen={setIsOpen} isOpen={isOpen} />
          </div>
          <Outlet />
          <div className="py-20"></div>
          <div
            className="fixed bottom-0 z-50"
            style={{ width: isOpen ? "90%" : "100%" }}
          >
            <DBFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
