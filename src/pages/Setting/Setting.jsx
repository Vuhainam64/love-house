import { NavLink, Outlet } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";

function Setting() {
  const user = useSelector((state) => state?.user?.user);
  return (
    <div>
      <Navbar />
      <div className="main-layout min-h-screen flex flex-col">
        <div className="bg-white flex-grow">
          <div className="flex bg-gray-50">
            <div className="w-full md:w-4/5 lg:w-3/5 md:mx-auto md:max-w-4xl px-4">
              <div className="pt-4 pb-0">
                <div className="flex">
                  <p className="flex-grow text-gray-900 font-semibold text-2xl">
                    My Account
                  </p>
                </div>
                <div className="flex text-gray-500">
                  <div>{user.email}</div>
                </div>
                <div className="mt-4 border-b border-gray-200">
                  <div className="flex flex-wrap -mb-px text-sm font-medium text-center">
                    <NavLink
                      to={"/setting/profile"}
                      className={({ isActive }) =>
                        isActive
                          ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-orange-600 text-orange-600 hover:text-orange-900"
                          : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                      }
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to={"/setting/password"}
                      className={({ isActive }) =>
                        isActive
                          ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-orange-600 text-orange-600 hover:text-orange-900"
                          : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                      }
                    >
                      Password
                    </NavLink>
                    {/* <NavLink
                      to={"/setting/account"}
                      className={({ isActive }) =>
                        isActive
                          ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-orange-600 text-orange-600 hover:text-orange-900"
                          : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                      }
                    >
                      Edit account
                    </NavLink> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex bg-white">
            <div className="w-full md:w-4/5 lg:w-3/5 md:mx-auto md:max-w-4xl px-4">
              <div className="mt-8 pb-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
