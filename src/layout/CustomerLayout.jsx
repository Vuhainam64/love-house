import { Outlet } from "react-router-dom";
import { CustomerSidebar, DBHeader, DBFooter } from "../components";

function CustomerLayout() {
  return (
    <div className="flex ">
      <CustomerSidebar />
      <div className="h-screen flex-1">
        <div className="sticky top-0 z-50 w-full">
          <DBHeader />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default CustomerLayout;
