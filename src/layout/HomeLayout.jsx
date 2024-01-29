import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div>
      {/* <p>Header</p>
      <Outlet></Outlet>
      <p>Footer</p> */}
      <Outlet/>
    </div>
  );
}

export default HomeLayout;
