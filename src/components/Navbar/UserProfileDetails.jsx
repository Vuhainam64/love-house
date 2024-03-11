import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import { FaChevronRight } from "react-icons/fa6";
import { AiOutlineMore } from "react-icons/ai";

import { logout } from "../../context/actions/authActions";
import { SET_USER_NULL } from "../../context/actions/userActions";
import avt from "../../assets/images/avt.jpg";

function UserProfileDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user?.user);
  //const role = useSelector((state) => state.user?.role);
  const auth = useSelector((state) => state?.auth);

  const isAdmin = auth?.userRole?.includes("ADMIN");

  const isStaff = auth?.userRole?.includes("STAFF");

  const [isMenu, setIsMenu] = useState(false);

  const handleSignout = () => {
    dispatch(logout());
    dispatch(SET_USER_NULL());
    navigate("/auth");
  };

  return (
    <div
      className="flex items-center justify-center w-full rounded-md px-4 py-2 text-sm text-gray-700  focus:outline-none focus:ring-2 
    focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500 relative"
    >
      <motion.div
        className="flex flex-row items-center cursor-pointer"
        onClick={() => setIsMenu(!isMenu)}
        whileTap={{ scale: 0.9 }}
      >
        <motion.img
          whileHover={{ scale: 1.2 }}
          src={user?.photoURL ? user?.photoURL : avt}
          alt="avatar"
          className="rounded-full w-12 h-12"
        />
        {/* <button className="ml-2 hidden sm:inline">{user?.displayName}</button> */}
        <div className="rounded-md flex items-center justify-center cursor-pointer">
          <AiOutlineMore size={20} />
        </div>
      </motion.div>
      <AnimatePresence>
        {isMenu && (
          <motion.div className="absolute top-16 right-8 px-4 py-3 rounded-xl shadow-md z-50 flex flex-col items-start justify-start gap-4 bg-white">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-between text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 
                w-full px-2 py-1 rounded-md cursor-pointer text-nowrap"
            >
              <Link to={"/customer/my-request"}>Customer Dashboard</Link>
              <div className="text-xs pl-2">
                <FaChevronRight />
              </div>
            </motion.div>

            {isAdmin && (
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-between text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 
                w-full px-2 py-1 rounded-md cursor-pointer text-nowrap"
              >
                <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                <div className="text-xs pl-2">
                  <FaChevronRight />
                </div>
              </motion.div>
            )}

            {isStaff && (
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-between text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 
                w-full px-2 py-1 rounded-md cursor-pointer text-nowrap"
              >
                <Link to={"/staff/all-request"}>Staff Dashboard</Link>
                <div className="text-xs pl-2">
                  <FaChevronRight />
                </div>
              </motion.div>
            )}

            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-between text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 
              w-full px-2 py-1 rounded-md cursor-pointer text-nowrap"
            >
              <Link to={"/setting/profile"}>Setting</Link>
              <div className="text-xs pl-2">
                <FaChevronRight />
              </div>
            </motion.div>

            <motion.div
              onClick={handleSignout}
              whileTap={{ scale: 0.9 }}
              className="flex items-center  text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 
              w-full pl-2 py-1 rounded-md cursor-pointer text-nowrap"
            >
              <div>Log out</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserProfileDetails;
