import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import control from "../../assets/images/control.png";
import HouseLogo from "../../assets/images/HouseLogo.png";
import {
  RiMailSendFill,
  RiLogoutCircleRLine,
  RiHome4Line,
  RiWallet3Line,
} from "react-icons/ri";
import { MdOutlinePriceChange } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";

export default function CustomerSidebar() {
  const [open, setOpen] = useState(true);
  const Menus = [
    {
      title: "Quote Request",
      icon: <RiMailSendFill />,
      path: "/customer/my-request",
    },
    // { title: "Quotation Detail", icon: <MdOutlinePriceChange /> },
    // { title: "Deal Quotation", icon: <GrTransaction /> },
    {
      title: "Accounts",
      icon: <FaRegCircleUser />,
      gap: true,
      path: "/customer/account/profile",
    },
    { title: "Transaction ", icon: <RiWallet3Line /> },

    // { title: "Analytics", icon: "Chart" },
    { title: "Go to Home page", icon: <RiHome4Line />, gap: true, path: "/" },
    { title: "Log out", icon: <RiLogoutCircleRLine /> },
  ];
  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-64" : "w-20 "
        } bg-white h-screen p-5 pt-7 relative duration-300`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-5 top-9 w-7  border-baseGreen
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
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-baseGreen text-black hover:text-white text-sm items-center gap-x-4 
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
        </ul>
      </div>
    </div>
  );
}
