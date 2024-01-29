import React from "react";
import mainlogo from "../../assets/images/mainlogo.png";
import { SiFacebook } from "react-icons/si";
import { SiZalo } from "react-icons/si";
import { SiYoutube } from "react-icons/si";
import { SiInstagram } from "react-icons/si";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-7">
          <div className="lg:col-span-3 col-span-12">
            <a href="/">
              <img className="h-12" src={mainlogo} alt="" />
            </a>
           
            <div className="flex " >
            <a href="/" className=" py-5 mr-2 hover:text-baseOrange"><SiFacebook size={25}/></a>
            <a href="/" className="px-4 py-5 mr-2 hover:text-baseOrange"><SiZalo size={25}/></a>
            <a href="/" className="px-4 py-5 mr-2 hover:text-baseOrange"><SiYoutube size={25}/></a>
            <a href="/" className="px-4 py-5 hover:text-baseOrange"><SiInstagram size={25}/></a>

            </div>
          </div>

          <div className="lg:col-span-3 md:col-span-4 col-span-12">
            <h5 className="tracking-wide text-neutral-100 font-semibold">
              Company
            </h5>
            <ul className="list-none mt-6 space-y-2">
              <li>
                <a
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  Construction Quotes
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 md:col-span-4 col-span-12">
            <h5 className="tracking-wide text-neutral-100 font-semibold">
              Important Links
            </h5>
            <ul className="list-none mt-6 space-y-2">
              <li>
                <a
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  Term of Services
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 md:col-span-4 col-span-12">
            <h5 className="tracking-wide text-neutral-100 font-semibold">
              Contact us
            </h5>
            <p></p>
            <ul className="list-none mt-6 space-y-2">
              <li>
                <p
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  No. 10, Street 7, Binh Thuan Ward, District 7, Ho Chi Minh
                  City.
                </p>
              </li>
              <li>
                <p
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  Hotline: 1900 638 535
                </p>
              </li>
              <li>
                <p
                  href=""
                  className="hover:text-baseOrange transition-all duration-500 ease-in-out"
                >
                  Email: lovehouse@gmai.com
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700">
        <div className="md:text-left text-center container mx-auto py-4 px-6">
          <p className="mb-0">
            &copy; {currentYear} LoveHouse Team 
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
