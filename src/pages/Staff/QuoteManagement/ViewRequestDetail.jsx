import React, { useState, Fragment } from "react";

import { Modal } from "../../../components";

import { Tag } from "antd";
import {
  AiOutlineUser,
  AiOutlineEye,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineEnvironment,
  AiOutlineTool,
  AiOutlineHome,
} from "react-icons/ai";

export default function ViewRequestDetail({ details }) {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };
  return (
    <>
      <Fragment>
        <button className="text-blue-500 hover:text-black transition ease-out">
          <AiOutlineEye size={20} onClick={handleButtonClick} />
        </button>

        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="font-normal p-4 my-auto lg:px-8 text-left overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            <h3 className="text-xl text-center font-semibold text-gray-900 mb-5 uppercase">
              Request Details
            </h3>

            <div>
              <div className="font-semibold border-b-2 mb-4 ">
                <h4 className="pb-2">I. Customer Information</h4>
              </div>

              <div className="space-y-5">
                <div className="flex ">
                  <div className="flex items-center mr-4">
                    <AiOutlineUser className="text-baseGreen" size={19} />
                    <span className="ml-2">Customer:</span>
                  </div>
                  <div>
                    {details.account.firstName} {details.account.lastName}
                  </div>
                </div>

                <div className="flex ">
                  <div className="flex items-center mr-4">
                    <AiOutlinePhone className="text-baseGreen" size={19} />
                    <span className="ml-2">Phone:</span>
                  </div>
                  <div>
                    {" "}
                    {details.account.phoneNumber
                      ? details.account.phoneNumber
                      : "N/A"}
                  </div>
                </div>

                <div className="flex ">
                  <div className="flex items-center mr-4">
                    <AiOutlineMail className="text-baseGreen" size={19} />
                    <span className="ml-2">Email:</span>
                  </div>
                  <div>
                    {" "}
                    {details.account.email ? details.account.email : "N/A"}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="font-semibold border-b-2 mt-8 mb-4 ">
                <h4 className="pb-2">II. Details request a quote</h4>
              </div>

              <div className="space-y-5">
                <div className="flex ">
                  <div className="flex items-center mr-4">
                    <AiOutlineEnvironment
                      className="text-baseGreen"
                      size={19}
                    />
                    <span className="ml-2">Location:</span>
                  </div>
                  <div>{details.addressProject}</div>
                </div>

                <div className="flex ">
                  <div className="flex items-center mr-4">
                    <AiOutlineTool className="text-baseGreen" size={19} />
                    <span className="ml-2">Construction Type:</span>
                  </div>
                  <div>
                    {details.constructionType === 1 && (
                      <Tag color="cyan">Completed</Tag>
                    )}

                    {details.constructionType === 0 && (
                      <Tag color="gold">Rough</Tag>
                    )}
                  </div>
                </div>

                <div className="flex ">
                  <div className="flex items-center mr-4">
                    <AiOutlineHome className="text-baseGreen" size={19} />
                    <span className="ml-2">Description:</span>
                  </div>
                  <div>
                    <span className="text-red-500">{details.numOfFloor}</span>{" "}
                    floor(s) -{" "}
                    <span className="text-red-500">{details.area}</span> m&#178;
                  </div>
                </div>

                <div className="flex flex-col ">
                  <div>
                    <img src={details.landDrawingFileUrl} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </Fragment>
    </>
  );
}
