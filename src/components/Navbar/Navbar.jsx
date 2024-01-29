import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import mainlogo from "../../assets/images/mainlogo.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import BtnLoginRegister from "../Button/BtnLoginRegister";

import Swal from "sweetalert2";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const isAuthenticated = useSelector((state) => !!state.auth.accessToken);
  
  const navigate = useNavigate();

  const handleConstructionQuotesClick = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "Authentication Required",
        text: "You must log in to use this feature!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK, Go to Sign In",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Sorry, you can't use this feature without logging in!",
          });
        }
      });
    } else {
      navigate("/quote-request");
    }
  };

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="w-full px-4 py-4 flex justify-between items-center h-24 mx-auto uppercase text-white bg-baseOrange z-20">
      <a href="/">
        <img src={mainlogo} alt="" className="h-80 w-200 m-3 " />
      </a>

      <ul className="hidden md:flex">
        <li className="p-4 hover:underline underline-offset-8">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="p-4 hover:underline underline-offset-8">
          <NavLink to="/aboutus">About Us</NavLink>
        </li>
        <li className="p-4 hover:underline underline-offset-8">
          <NavLink to="/houseProject">Projects</NavLink>
        </li>
        <li className="p-4 hover:underline underline-offset-8 cursor-pointer">
          <span onClick={handleConstructionQuotesClick}>
            Construction Quotes
          </span>
        </li>
        <li className="p-4 hover:underline underline-offset-8">
          <NavLink to="/news">News</NavLink>
        </li>
        <li className="p-4 hover:underline underline-offset-8">
          <NavLink to="/blog">Blogs</NavLink>
        </li>
      </ul>

      <div className="hidden md:flex">
        <BtnLoginRegister />
      </div>
      {/* <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="" className="w-[40px] rounded-full"/> */}

      <div onClick={handleNav} className="block md:hidden px-10">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-baseOrange ease-in-out duration-500 z-[1000]"
            : "fixed left-[-100%] top-0 w-[60%] h-full border-r border-r-gray-900 bg-baseOrange ease-in-out duration-500 z-[1000]"
        }
      >
        <a href="">
          <img src={mainlogo} alt="" className="h-80 w-200 m-3" />
        </a>

        <ul className=" uppercase p-4">
          <li className="p-4">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="p-4">
            <NavLink to="/aboutus">About Us</NavLink>
          </li>
          <li className="p-4">
            <NavLink to="/houseProject">Project</NavLink>
          </li>
          <li className="p-4 cursor-pointer">
            <span onClick={handleConstructionQuotesClick}>
              Construction Quotes
            </span>
          </li>
          <li className="p-4">
            <NavLink to="/news">News</NavLink>
          </li>
          <li className="p-4">
            <NavLink to="/blog">Blogs</NavLink>
          </li>
        </ul>

        <div className="flex justify-center uppercase mt-6">
          <BtnLoginRegister />
        </div>
      </div>
    </div>
  );
}
