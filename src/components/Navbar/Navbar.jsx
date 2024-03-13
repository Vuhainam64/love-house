import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose,AiOutlineMenu } from "react-icons/ai";

import Swal from "sweetalert2";
import mainlogo from "../../assets/images/mainlogo.png";
import BtnLoginRegister from "../Button/BtnLoginRegister";

export default function Navbar() {
  const [navBar, setNavBar] = useState(false);
  const isAuthenticated = useSelector((state) => !!state.auth.accessToken);

  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <header className="bg-white">
      <nav
        className="flex justify-between items-center w-full px-12 md:px-24 mx-auto fixed top-0 left-0 right-0 bg-white "
        style={{ zIndex: 1000 }}
      >
        <Link to={"/"}>
          <img src={mainlogo} alt="" className="w-36" />
        </Link>

        <div
          className={`nav-links md:static absolute bg-white md:min-h-fit min-h-[60vh] -left-2 transition-all duration-500 ease-in ${
            navBar ? "top-[65px]" : "top-[-490px]"
          } md:w-auto w-full flex items-center justify-center text-center px-12`}
          style={{ zIndex: 1000 }}
        >
          <ul className="flex md:flex-row flex-col justify-center md:items-center md:gap-[4vw] gap-8">
            <li>
              <NavLink
                to="/"
                className={` item ${
                  location.pathname === "/"
                    ? "border-baseGreen border-b-2 px-2 py-1 text-black hover:border-none"
                    : ""
                }`}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/aboutus"
                className={` item ${
                  location.pathname === "/aboutus"
                    ? "border-baseGreen border-b-2 px-2 py-1 text-black hover:border-none"
                    : ""
                }`}
              >
                About Us
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/houseProject"
                className={`item ${
                  location.pathname === "/houseProject"
                    ? "border-baseGreen border-b-2 px-2 py-1 text-black hover:border-none"
                    : ""
                }`}
              >
                Projects
              </NavLink>
            </li>

            <li>
              <span
                onClick={handleConstructionQuotesClick}
                className={`item cursor-pointer ${
                  location.pathname === "/quote-request"
                    ? "border-baseGreen border-b-2 px-2 py-1 text-black hover:border-none"
                    : ""
                }`}
              >
                Construction Quotes
              </span>
            </li>

            <li>
              <NavLink
                to="/news"
                className={`item ${
                  location.pathname === "/news"
                    ? "border-baseGreen border-b-2  px-2 py-1 text-black hover:border-none"
                    : ""
                }`}
              >
                News
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/blog"
                className={`item ${
                  location.pathname === "/blog"
                    ? "border-baseGreen border-b-2 px-2 py-1 text-black hover:border-none"
                    : ""
                }`}
              >
                Blogs
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <BtnLoginRegister />

          <button
            className="text-3xl cursor-pointer md:hidden"
            onClick={() => setNavBar(!navBar)}
          >
            {navBar ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </nav>
    </header>
  );
}
