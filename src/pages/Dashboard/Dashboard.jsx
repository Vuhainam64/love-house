import { Outlet } from "react-router";
import { DBFooter, DBHeader, DBSidebar } from "../../components";
import { useState } from "react";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);

  const sidebarContent = <DBSidebar setIsOpen={setIsOpen} />;

  const mainContent = (
    <div className="w-full">
      <div className="sticky top-0 z-50">
        <DBHeader setIsOpen={setIsOpen} isOpen={isOpen} />
      </div>
      <Outlet />
      <div className="py-20"></div>
      <div
        className="fixed bottom-0 z-50"
        style={{ width: isOpen ? "80%" : "100%" }}
      >
        <DBFooter />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-5">
      {isOpen ? (
        <>
          {sidebarContent}
          <div className="col-span-4">{mainContent}</div>
        </>
      ) : (
        <>
          <div className="col-span-5">{mainContent}</div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
