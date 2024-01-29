import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <p>Header</p>
      <Outlet></Outlet>
      <p>Footer</p>
    </div>
  );
}

export default AdminLayout;
