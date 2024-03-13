import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import control from "../../assets/images/control.png";
import HouseLogo from "../../assets/images/HouseLogo.png";

import {
  AiOutlineFileSearch,
  AiOutlineIdcard,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import { logout } from "../../context/actions/authActions";
import { SET_USER_NULL } from "../../context/actions/userActions";

export default function CustomerSidebar() {
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(logout());
    dispatch(SET_USER_NULL());
  };

  const [open, setOpen] = useState(true);
  const Menus = [
    {
      title: "Quote Request",
      icon: <AiOutlineFileSearch />,
      path: "/customer/my-request",
    },
    {
      title: "Accounts",
      icon: <AiOutlineIdcard />,
      path: "/customer/account/profile",
    },

    { title: "Go to Home page", icon: <AiOutlineHome />, gap: true, path: "/" },
  ];

  return (
    <div className="flex pr-4">
      <div
        className={` ${
          open ? "w-64" : "w-20 "
        } bg-white h-screen p-5 pt-7 relative duration-300`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-2 top-9 w-7  border-baseGreen
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <NavLink to="/">
          <div className="flex gap-x-4 items-center">
            <img
              src={HouseLogo}
              className={`cursor-pointer duration-500 w-10 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-black origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              LoveHouse
            </h1>
          </div>
        </NavLink>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <NavLink
              key={index}
              to={Menu.path}
              className="text-decoration-none"
            >
              <li
                key={index}
                className={`flex my-2 rounded-md p-2 cursor-pointer hover:bg-baseGreen text-black hover:text-white text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-baseGreen text-white"
                } `}
              >
                <span style={{ fontSize: "24px" }}>{Menu.icon}</span>

                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </NavLink>
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
              <span className={open ? "inline-block" :"hidden"}>Logout</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
