import React from "react";
import { ProjectStatusBadge, DateFormatter } from "../../../../../components";
import { FaRegUser, FaRegCalendarAlt, FaChartArea } from "react-icons/fa";
import {
  IoBuildOutline,
  IoLocationOutline,
  IoHomeOutline,
  IoTimeOutline,
} from "react-icons/io5";

const ProjectGrid = ({ projectDetail }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      <div
        key={projectDetail.id}
        className="bg-gray-50 border border-gray-300 space-y-3 rounded-lg shadow px-8 py-5"
      >
        <div className="text-right">
          <ProjectStatusBadge
            projectStatus={projectDetail?.project?.projectStatus}
          />
        </div>

        <div className="flex justify-between sm:mb-3 pt-2">
          <span className="flex items-center">
            {" "}
            <FaRegUser className="mr-2 pb-1" size={20} />
            Customer:{" "}
          </span>
          <div className="text-blue-500 font-bold hover:underline ml-4">
            {projectDetail?.project?.account?.firstName}{" "}
            {projectDetail?.project?.account?.lastName}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaRegCalendarAlt className="mr-2 pb-1" size={20} />
            Create date:
          </div>

          <span className="text-gray-500">
            <DateFormatter dateString={projectDetail?.project?.createDate} />
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center">
            <IoLocationOutline className="mr-2" />
            Location:
          </div>
          <span className="text-gray-500">
            {projectDetail?.project?.addressProject}
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center">
            <IoBuildOutline className="mr-2" />
            Construction type:
          </div>

          <span className="text-gray-500">
            {projectDetail?.project?.constructionType === 0
              ? "Rough"
              : "Completed"}
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center">
            <IoHomeOutline className="mr-2" />
            Floors:
          </div>
          <span className="text-gray-500">
            {projectDetail?.project?.numOfFloor}
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center">
            <FaChartArea className="mr-2" />
            Area:
          </div>
          <span className="text-gray-500">
            {projectDetail?.project?.area} m&#178;
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center">
            <IoTimeOutline className="mr-2" />
            Estimated completion time:
          </div>
          <span className="text-gray-500">
            {projectDetail?.project?.estimatedTimeOfCompletion} days
          </span>
        </div>

        <div className="text-sm font-medium text-black text-right"></div>
      </div>
    </div>
  );
};

export default ProjectGrid;