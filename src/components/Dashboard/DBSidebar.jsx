import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaArrowLeft,
  FaChevronDown,
  FaChevronUp,
  FaRegCalendarAlt,
  FaRegUser,
} from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { AiOutlinePieChart, AiOutlineProject } from "react-icons/ai";
import { FaBlog, FaRegNewspaper } from "react-icons/fa6";

import { buttonClick, slideUpOut } from "../../assets/animations";
import { logout } from "../../context/actions/authActions";
import { SET_USER_NULL } from "../../context/actions/userActions";
import { HouseLogo, isActiveStyles, isNotActiveStyles } from "../../assets";

function DBSidebar({ setIsOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDashboard, setIsDashboard] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [isNews, setIsNews] = useState(true);
  const [isProject, setIsProject] = useState(true);
  const [isBlogs, setIsBlogs] = useState(true);

  const handleSignout = () => {
    dispatch(logout());
    dispatch(SET_USER_NULL());
    navigate("/auth");
  };

  return (
    <div
      className="sticky top-0 z-50 flex h-screen w-72.5 flex-col bg-baseDashboard overflow-y-auto
      duration-300 ease-linear scrollbar-thin scrollbar-none scrollbar-track-gray-100"
    >
      <div className="items-center justify-between px-6 py-5.5 lg:py-6.5">
        {/* logo  */}
        <div className="flex justify-between items-center py-4">
          <Link to={"/"} className="flex items-center text-white">
            <img src={HouseLogo} alt="logo" className="w-10" />
            <p className="px-2 text-xl">Love House</p>
          </Link>
          <div
            className="text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <FaArrowLeft />
          </div>
        </div>

        {/* Menu  */}
        <div className="pl-2 pt-6 text-slate-200">
          <div className="pt-4">
            <p className="text-slate-400 uppercase font-semibold py-2">Menu</p>

            {/* dashboard  */}
            <div
              onClick={() => {
                setIsDashboard(!isDashboard);
              }}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center justify-start py-2">
                <IoGridOutline className="" />
                <div className="pl-2">Dashboard</div>
              </div>
              <div>{isDashboard ? <FaChevronDown /> : <FaChevronUp />}</div>
            </div>

            {/* navlink  */}
            {!isDashboard && (
              <>
                <motion.div {...slideUpOut} className={`flex flex-col `}>
                  <NavLink
                    to={"/dashboard/home"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Home
                  </NavLink>
                </motion.div>
              </>
            )}

            {/* user management  */}
            <div
              onClick={() => {
                setIsUser(!isUser);
              }}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center justify-start py-2">
                <FaRegUser className="" />
                <div className="pl-2">User Management</div>
              </div>
              <div>{isUser ? <FaChevronDown /> : <FaChevronUp />}</div>
            </div>

            {/* navlink  */}
            {!isUser && (
              <>
                <motion.div {...slideUpOut} className={`flex flex-col `}>
                  <NavLink
                    to={"/dashboard/users-list"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 
                        hover:bg-opacity-50  pl-16 p-2w-full font-semibold`
                        : isNotActiveStyles
                    }
                  >
                    Users List
                  </NavLink>
                  <NavLink
                    to={"/create-user"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Create User
                  </NavLink>
                  <NavLink
                    to={"/staff"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Staff Activity
                  </NavLink>
                  <NavLink
                    to={"/role"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Role Permission
                  </NavLink>
                </motion.div>
              </>
            )}

            {/* Calendar  */}
            <NavLink
              to={"/calendar"}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center justify-start py-2 pl-8 text-xl border-l-8  border-slate-600"
                  : "flex items-center justify-start py-2"
              }
            >
              <FaRegCalendarAlt className="" />
              <div className="pl-2">Calendar</div>
            </NavLink>

            {/* Setting  */}
            <NavLink
              to={"/setting"}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center justify-start py-2 pl-8 text-xl border-l-8  border-slate-600"
                  : "flex items-center justify-start py-2"
              }
            >
              <CiSettings className="text-xl" />
              <div className="pl-2">Setting</div>
            </NavLink>
          </div>
        </div>

        {/* Functions  */}
        <div className="pl-2 pt-6 text-slate-200">
          <div className="pt-4">
            <p className="text-slate-400 uppercase font-semibold py-2">
              Functions
            </p>

            {/* House Project Page  */}
            <div
              onClick={() => {
                setIsProject(!isProject);
              }}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center justify-start py-2">
                <AiOutlineProject className="text-xl" />
                <div className="pl-2">House Project Page</div>
              </div>
              <div>{isProject ? <FaChevronDown /> : <FaChevronUp />}</div>
            </div>

            {/* navlink  */}
            {!isProject && (
              <>
                <motion.div {...slideUpOut} className={`flex flex-col `}>
                  <NavLink
                    to={"/dashboard/create-sample-project"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Create Project
                  </NavLink>

                  <NavLink
                    to={"/dashboard/list-project"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Project List
                  </NavLink>
                </motion.div>
              </>
            )}

            {/* News  */}
            <div
              onClick={() => {
                setIsNews(!isNews);
              }}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center justify-start py-2">
                <FaRegNewspaper className="" />
                <div className="pl-2">News Management</div>
              </div>
              <div>{isNews ? <FaChevronDown /> : <FaChevronUp />}</div>
            </div>

            {/* navlink  */}
            {!isNews && (
              <>
                <motion.div {...slideUpOut} className={`flex flex-col `}>
                  <NavLink
                    to={"/dashboard/create-news"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Create News
                  </NavLink>
                  <NavLink
                    to={"/dashboard/list-news"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    News List
                  </NavLink>
                </motion.div>
              </>
            )}

            {/* Blogs  */}
            <div
              onClick={() => {
                setIsBlogs(!isBlogs);
              }}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center justify-start py-2">
                <FaBlog className="" />
                <div className="pl-2">Blogs Management</div>
              </div>
              <div>{isBlogs ? <FaChevronDown /> : <FaChevronUp />}</div>
            </div>

            {/* navlink  */}
            {!isBlogs && (
              <>
                <motion.div {...slideUpOut} className={`flex flex-col `}>
                  <NavLink
                    to={"/dashboard/create-blog"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Create blog
                  </NavLink>
                  <NavLink
                    to={"/dashboard/list-blog"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Blogs List
                  </NavLink>
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Other  */}
        <div className="pl-2 pt-6 text-slate-200">
          {/* Menu  */}
          <div className="pt-4">
            <p className="text-slate-400 uppercase font-semibold py-2">Other</p>

            {/* Chart  */}
            <NavLink
              to={"/calendar"}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center justify-start py-2 pl-8 text-xl border-l-8  border-slate-600"
                  : "flex items-center justify-start py-2"
              }
            >
              <AiOutlinePieChart className="text-xl" />
              <div className="pl-2">Chart</div>
            </NavLink>

            {/* logout  */}
            <motion.div
              {...buttonClick}
              className="flex items-center justify-start py-2 cursor-pointer"
              onClick={handleSignout}
            >
              <MdLogout className="text-xl" />
              <div className="pl-2">Logout</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DBSidebar;
