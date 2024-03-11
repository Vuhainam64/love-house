import { Outlet } from "react-router-dom";

import { AdminSidebar, DBHeader, DBFooter } from "../components";

function AdminLayout() {
  return (
    <div className="flex ">
    <AdminSidebar />
    <div className="h-screen flex-1">
      <div className="sticky top-0 z-50 w-full">
        <DBHeader />
      </div>

      <Outlet />

    </div>
  </div>
  );
}

export default AdminLayout;
