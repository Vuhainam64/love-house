import React from "react";
import { NavLink } from "react-router-dom";

import { FaFacebookF } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";

import {CurrencyFormatter} from "../../../components"

export default function OverviewProjectSection({houseProjectDetail}) { 

  return (
    <>
      <div className="detail wrapper py-4 mx-auto mt-12">
        <div className="wraps max-w-[970px] mx-auto">
          <div className="tpdetail">
            <div className="grpgh flex flex-wrap mx-[-15px]">
              <div className="leftcol w-full lg:w-[calc(100%-300px)] p-4">
                <div className="lldetailpgh">
                  <div className="theinfo mb-5">
                    <ul className="flex flex-wrap -mx-2">
                      <li className="flex w-1/2 px-2 mb-4">
                        <div className="icon w-[20px]">
                          <img
                            src="https://mhomevietnam.vn/vnt_upload/project/08_2022/hh1.png"
                            alt=""
                          />
                        </div>

                        <div className="text w-full pl-2">
                          <strong>Total area: </strong>
                          {houseProjectDetail.sampleProject.totalArea} m&#178;
                        </div>
                      </li>
                      <li className="flex w-1/2 px-2 mb-4">
                        <div className="icon w-[20px]">
                          <img
                            src="https://mhomevietnam.vn/vnt_upload/project/08_2022/hh6.png"
                            alt=""
                          />
                        </div>

                        <div className="text w-full pl-2">
                          <strong>Construction area: </strong>
                          {
                            houseProjectDetail.sampleProject.constructionArea
                          }{" "}
                          m&#178;
                        </div>
                      </li>
                      <li className="flex w-1/2 px-2 mb-4">
                        <div className="icon w-[20px]">
                          <img
                            src="https://mhomevietnam.vn/vnt_upload/project/08_2022/hh7.png"
                            alt=""
                          />
                        </div>

                        <div className="text w-full pl-2">
                          <strong>Number of floor: </strong>
                          {houseProjectDetail.sampleProject.numOfFloor}
                        </div>
                      </li>
                      <li className="flex w-1/2 px-2 mb-4">
                        <div className="icon w-[20px]">
                          <img
                            src="https://mhomevietnam.vn/vnt_upload/project/08_2022/hh2.png"
                            alt=""
                          />
                        </div>

                        <div className="text w-full pl-2">
                          <strong>Description: </strong>
                          {houseProjectDetail.sampleProject.function}
                        </div>
                      </li>
                      <li className="flex w-1/2 px-2 mb-4">
                        <div className="icon w-[20px]">
                          <img
                            src="https://mhomevietnam.vn/vnt_upload/project/08_2022/hh4.png"
                            alt=""
                          />
                        </div>

                        <div className="text w-full pl-2">
                          <strong>Location: </strong>
                          {houseProjectDetail.sampleProject.location}
                        </div>
                      </li>
                      <li className="flex w-1/2 px-2 mb-4">
                        <div className="icon w-[20px]">
                          <img
                            src="https://mhomevietnam.vn/vnt_upload/project/08_2022/hh8.png"
                            alt=""
                          />
                        </div>

                        <div className="text w-full pl-2">
                          <strong>Estimate Price: </strong>

                          <CurrencyFormatter
                            amount={
                              houseProjectDetail.sampleProject.estimatePrice
                            }
                          />
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="thedesc ">
                    <div
                      className="para text-justify"
                      dangerouslySetInnerHTML={{
                        __html: houseProjectDetail.sampleProject.content,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="rightcol w-300 p-4">
                <div className="rrdetailpgh">
                  <div className="lhlinkregis mb-4">
                    <NavLink
                      to="/your-route"
                      className="flex items-center content-center px-4 py-2 text-sm font-bold uppercase border border-baseOrange bg-baseOrange text-white rounded"
                    >
                      <span className="img mr-4">
                        <img
                          src="https://mhomevietnam.vn/skins/default/images/dk.png"
                          alt=""
                        />
                      </span>
                      <span>Sign up for advice</span>
                    </NavLink>
                  </div>

                  <div className="lhinfotool bg-gray-200 rounded-md overflow-hidden p-4 flex justify-center">
                    <div className="fxpoptool">
                      <div className="itpop flex">
                        <div className="ptxt">Hotline:</div>
                        <div className="pnum flex items-center">
                          <div className="nicon mr-3">
                            <img
                              src="/vnt_upload/project/08_2022/iphone.png"
                              alt=""
                            />
                          </div>

                          <div className="ntell line-height-6 font-bold text-gray-800">
                            <a href="" className="hover:text-baseOrange">
                              1900 638 535
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="itpop flex items-center mt-4 ">
                        <div className="ptxt">Share:</div>

                        <div className="psha">
                          <ul className="flex flex-wrap items-center content-center">
                            <li className="ml-3 w-9 h-9 flex items-center content-center justify-center bg-white rounded-full">
                              <FaFacebookF />
                            </li>
                            <li className="ml-3 w-9 h-9 flex items-center content-center justify-center bg-white rounded-full">
                              <SiZalo />
                            </li>
                            <li className="ml-3 w-9 h-9 flex items-center content-center justify-center bg-white rounded-full">
                              <FaInstagram />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
