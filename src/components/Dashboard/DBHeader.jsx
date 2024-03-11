import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";

import { Avatar, HouseLogo } from "../../assets";
import { buttonClick } from "../../assets/animations";

import { FaArrowLeft } from "react-icons/fa";
import { TbHomeMove } from "react-icons/tb";

import avt from "../../assets/images/avt.jpg"

function DBHeader({ setIsOpen, isOpen }) {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="flex items-center justify-between w-full bg-white p-4 shadow sticky top-0 ">
      <div className="flex items-center justify-center ">
        <NavLink to="" onClick={() => window.history.back()}>
          <div className="flex items-center space-x-2 text-green-600 hover:text-green-400">
            <FaArrowLeft />
            <span>Back</span>
          </div>
        </NavLink>
      </div>
      <div className="flex items-center">
        
        <div className="relative bg-slate-100 p-2 rounded-full mx-2 cursor-pointer hover:bg-baseGreen hover:text-white mr-8">
          {/* <AiOutlineMessage className="text-xl" /> */}
          <NavLink to="/">
            <TbHomeMove className="text-xl" />
          </NavLink>
        </div>
        {/* <div className="relative bg-slate-100 p-2 rounded-full mx-2 cursor-pointer">
          <IoMdNotificationsOutline className="text-xl" />
          <div className="absolute px-1 py-1 bg-red-600 rounded-full top-0 right-0"></div>
        </div> */}

        <div className="flex items-center">
          <img src={avt} alt="avatar" className="w-10"/>
          {user && (
          <div className="box mx-4 font-semibold p-1 ml-2 rounded">
            Welcome, {user.firstName} !
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default DBHeader;
