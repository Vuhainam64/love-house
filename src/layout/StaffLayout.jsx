import { Outlet } from "react-router-dom";
import { StaffSidebar, DBHeader, DBFooter } from "../components";

function StaffLayout() {
  return (
    <div className="flex overflow-hidden">
      <StaffSidebar />
      <div className="h-screen flex-1">
        <div className="sticky top-0 z-50 w-full">
          <DBHeader />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
export default StaffLayout;
