import React from "react";
import { NavLink } from "react-router-dom";
import {
  ProjectStatusBadge,
  DateFormatter,
} from "../../../components";
import { Tag } from "antd";
import {
  AiOutlineUser,
  AiOutlineEye,
  AiOutlinePhone,
  AiOutlineMail,AiOutlineCarryOut
} from "react-icons/ai";
import ProjectDetailGrid from "./Grid/ProjectDetailGrid";

export default function ProjectDetailsForCustomer({projectDetail}) {


  return (
    <>
      <div className="flex-1 p-5">
        <div className="px-2 mb-4">
          <div className="font-semibold border-b-2 mb-4 ">
            <h4 className="pb-2 uppercase">Customer Information</h4>
          </div>

          <div className="flex flex-col space-y-5 mb-4 mx-5">
            <div className="flex ">
              <div className="flex items-center mr-4">
                <AiOutlineUser className="text-baseGreen" size={19} />
                <span className="ml-2 text-gray-700">Customer:</span>
              </div>
              <div>
                {projectDetail?.project?.account?.firstName}{" "}
                {projectDetail?.project?.account?.lastName}
              </div>
            </div>

            <div className="flex ">
              <div className="flex items-center mr-4">
                <AiOutlinePhone className="text-baseGreen" size={19} />
                <span className="ml-2 text-gray-700">Phone:</span>
              </div>
              <div>
                {" "}
                {projectDetail?.project?.account?.phoneNumber
                  ? projectDetail?.project?.account?.phoneNumber
                  : "N/A"}
              </div>
            </div>

            <div className="flex ">
              <div className="flex items-center mr-4">
                <AiOutlineMail className="text-baseGreen" size={19} />
                <span className="ml-2 text-gray-700">Email:</span>
              </div>
              <div>
                {" "}
                {projectDetail?.project?.account?.email
                  ? projectDetail?.project?.account?.email
                  : "N/A"}
              </div>
            </div>

            <div className="flex ">
              <div className="flex items-center mr-4">
                <AiOutlineCarryOut className="text-baseGreen" size={19} />
                <span className="ml-2 text-gray-700">Request creation date:</span>
              </div>
              <div>
              <DateFormatter dateString={projectDetail?.project?.createDate} />
              </div>
            </div>
          </div>
        </div>

        <div className="py-5 px-2 h-auto mt-4">
          <div className="font-semibold border-b-2 mb-4 flex space-x-4 items-center">
            <h4 className="pb-2 uppercase">Project details</h4>
            <div className="pb-2">
              <ProjectStatusBadge
                projectStatus={projectDetail?.project?.status}
              />
            </div>
          </div>
          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-44 p-3 text-sm font-semibold tracking-wide text-left">
                    Descriptions
                  </th>
                  <th className="w-56 p-3 text-sm font-semibold tracking-wide text-left">
                    Location
                  </th>
                  <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">

                    Construction Type
                  </th>
                  <th className="w-28 p-3 text-sm font-semibold tracking-wide text-left">
                    Tiled Area
                  </th>
                  <th className="w-28 p-3 text-sm font-semibold tracking-wide text-left ">
                    Wall Dimensions
                  </th>

                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left ">
                    Mixing Ratio
                  </th>

                  <th className="w-44 p-3 text-sm font-semibold tracking-wide text-left">
                    Estimated Time of Completion
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                    Image
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr
                  key={projectDetail.id}
                  className="bg-white text-black text-left"
                >
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    Floors: {projectDetail?.project?.numOfFloor}
                    <br />
                    Area: {projectDetail?.project?.area} m<sup>2</sup>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {projectDetail?.project?.addressProject}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {projectDetail?.project?.constructionType === 0 ? (
                      <Tag color="gold">Rough</Tag>
                    ) : (
                      <Tag color="cyan">Completed</Tag>
                    )}
                  </td>
                  <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap">
                    {projectDetail?.project?.tiledArea} m<sup>2</sup>
                  </td>
                  <td className=" w-40 p-3 text-sm text-gray-700 whitespace-nowrap">
                    Length: {projectDetail?.project?.wallLength} m
                    <br />
                    Height: {projectDetail?.project?.wallHeight} m
                  </td>
                  <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap ">
                    Sand: {projectDetail?.project?.sandMixingRatio}
                    <br />
                    Cement: {projectDetail?.project?.cementMixingRatio}
                    <br />
                    Stone: {projectDetail?.project?.stoneMixingRatio}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap ">
                    {projectDetail?.project?.estimatedTimeOfCompletion} days
                  </td>

                  <td className="p-3 text-sm text-gray-700 text-center">
                    <NavLink
                      to={projectDetail?.project?.landDrawingFileUrl}
                      className="text-blue-500 hover:text-black"
                    >
                      <AiOutlineEye size={24} />
                    </NavLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <ProjectDetailGrid projectDetail={projectDetail}/>
        </div>
      </div>
    </>
  );
}
