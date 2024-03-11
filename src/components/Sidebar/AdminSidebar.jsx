import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  AiOutlinePieChart,
  AiOutlineHome,
  AiOutlineShop,
  AiOutlineTeam,
  AiOutlineLogout,
  AiOutlineDown,
  AiOutlineUp,
} from "react-icons/ai";

import control from "../../assets/images/control.png";
import HouseLogo from "../../assets/images/HouseLogo.png";
import { logout } from "../../context/actions/authActions";
import { SET_USER_NULL } from "../../context/actions/userActions";

export default function AdminSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleSignout = () => {
    dispatch(logout());
    dispatch(SET_USER_NULL());
  };

  const Menus = [
    {
      title: "Dashboard",
      icon: <AiOutlinePieChart />,
      path: "/admin/dashboard",
    },

    {
      title: "User Management",
      icon: <AiOutlineTeam />,
      path: "/admin/users-list",
    },
    {
      title: "Supplier Management",
      icon: <AiOutlineShop />,
      submenu: [
        { title: "List Supplier", path: "/admin/view-supplier" },
        {
          title: "View Supplier Price",
          path: "/admin/view-supplier-price",
        },
      ],
    },
    { title: "Go to Home page", icon: <AiOutlineHome />, gap: true, path: "/" },
  ];

  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className=" flex w-72.5 overflow-y-auto duration-300 ease-linear scrollbar-thin scrollbar-none scrollbar-track-gray-100 border-r shadow-sm">
      <div
        className={`${
          open ? "w-64" : "w-28"
        } bg-white h-screen p-5 pt-7 relative duration-300`}
      >
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex gap-x-4 items-center">
            <img
              src={HouseLogo}
              className={`cursor-pointer duration-500 w-10 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-black origin-left font-medium text-xl duration-200 ${
                !open && "hidden"
              }`}
            >
              LoveHouse
            </h1>
          </NavLink>
          <img
            src={control}
            className={` cursor-pointer top-9 w-7  border-baseGreen
   border-2 rounded-full ml-10  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <React.Fragment key={index}>
              {menu.label && open ? (
                <li
                  key={`label-${index}`}
                  className="text-gray-500 uppercase font-bold text-md mb-2 mt-8"
                >
                  {menu.label}
                </li>
              ) : null}
              {!menu.label ? (
                <>
                  <NavLink
                    key={index}
                    to={menu.path}
                    className="text-decoration-none "
                  >
                    <li
                      // key={index}
                      onClick={() => toggleSubMenu(index)}
                      // className={`flex rounded-md p-2 cursor-pointer hover:bg-baseGreen text-black hover:text-white text-sm items-center gap-x-4
                      // ${menu.gap ? "mt-9" : "mt-2"} ${
                      //   index === 0 && "bg-baseGreen text-white"
                      // } `}

                      className={`flex rounded-md p-2 my-2 cursor-pointer ${
                        isActive(menu.path)
                          ? "bg-baseGreen text-white"
                          : "hover:bg-base4 text-black hover:text-white"
                      } text-sm items-center gap-x-4`}
                    >
                      <span style={{ fontSize: "22px" }}>{menu.icon}</span>
                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200`}
                      >
                        {menu.title}
                      </span>
                      {menu.submenu && (
                        <span
                          className={`ml-auto ${open ? "block" : "hidden"}`}
                        >
                          {activeSubMenu === index ? (
                            <AiOutlineUp />
                          ) : (
                            <AiOutlineDown />
                          )}
                        </span>
                      )}
                    </li>
                  </NavLink>

                  {menu.submenu && activeSubMenu === index && (
                    <ul className={`pl-6 ${open ? "block" : "hidden"}`}>
                      {menu.submenu.map((submenu, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={submenu.path}
                          className="text-decoration-none"
                        >
                          <li
                            className={`flex rounded-md p-2 my-2 cursor-pointer ${
                              location.pathname === submenu.path
                                ? "bg-baseGreen text-white"
                                : "hover:bg-base3 text-black hover:text-white"
                            } text-sm items-center gap-x-4`}
                          >
                            <span style={{ fontSize: "24px" }}>&nbsp;</span>
                            <span
                              className={`${
                                !open && "hidden"
                              } origin-left duration-200`}
                            >
                              {submenu.title}
                            </span>
                          </li>
                        </NavLink>
                      ))}
                    </ul>
                  )}
                </>
              ) : null}
            </React.Fragment>
          ))}
          <NavLink
            to={"/auth"}
            onClick={handleSignout}
            className="text-decoration-none"
          >
            <li className="flex my-2 rounded-md p-2 cursor-pointer hover:bg-baseGreen text-black hover:text-white text-sm items-center gap-x-4 mt-2">
              <span className="text-2xl">
                <AiOutlineLogout />
              </span>
              <span>Logout</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
