import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { TypeAnimation } from "react-type-animation";
import Swal from "sweetalert2";

import { AiOutlineCaretRight } from "react-icons/ai";
import { LikeOutlined } from "@ant-design/icons";
import { Col, Row, Statistic } from "antd";
import main_image from "../../assets/images/main_image.jpg";

const formatter = (value) => <CountUp end={value} separator="," />;
export default function Hero() {
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
  return (
    <section className="h-full max-h-[640px] mb-32 md:mb-24 mt-24">
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 lg:pl-24 ">
          <h1 className="lg:text-7xl text-4xl leading-3 mb-6 font-semibold space-y-4">
            <p>Crafting <span className="underline italic decoration-[#fdca51]">
            dreams,
              </span></p>
            
            <p>
            <TypeAnimation
              sequence={["building realities", 2000,
              "empowering your vision", 2000,
             ]}
              wrapper="span"
              speed={50}
              style={{
                display: "inline-block",               
                fontStyle: "italic",
              }}
              repeat={Infinity}
              className="responsive-type-animation text-gray-700"
            />            
            </p>           
          </h1>
          <p className="max-w-[480px] mb-8 mt-4">
            {" "}
            Unleash the potential of your dream home with our comprehensive
            construction quote platform – Where quality meets affordability!
          </p>
          <div className="flex items-center gap-x-2">
            <button
              onClick={handleConstructionQuotesClick}
              className="flex items-center justify-center space-x-1 rounded-full px-3 py-2 text-sm text-white font-semibold bg-baseGreen hover:bg-base4 transition ease-out duration-300 transform hover:scale-110"
            >
              <p className="ml-1">Our Services</p>
              <AiOutlineCaretRight size={17} />
            </button>

            <NavLink to="/houseProject">
              <button className="flex items-center justify-center space-x-1 rounded-full px-3 py-2  text-sm transition ease-out duration-300 transform hover:scale-110">
                <p>View Projects</p>
                <AiOutlineCaretRight size={17} />
              </button>
            </NavLink>
          </div>
        </div>

        <div className="hidden flex-1 lg:flex justify-end items-end ">
          <img src={main_image} alt="" className=" rounded-tl-[80px]" />
        </div>
      </div>
    </section>
  );
}
