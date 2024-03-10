import React from "react";
import { NavLink } from "react-router-dom";
import { DateFormatter } from "../../../../../components";

import { Tag } from "antd";

const ProjectGrid = ({ projectDetail }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      <div
        key={projectDetail.id}
        className="bg-gray-50 border border-gray-300 space-y-3 rounded-lg shadow px-8 py-5"
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Create date:</span>

          <span className="text-rose-500 font-semibold">
            <DateFormatter dateString={projectDetail?.project?.createDate} />
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Location:</span>
          <span>{projectDetail?.project?.addressProject}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Construction type:</span>

          <span>
            {projectDetail?.project?.constructionType === 0 ? (
              <Tag color="gold">Rough</Tag>
            ) : (
              <Tag color="cyan">Completed</Tag>
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Floors:</span>

          <span>{projectDetail?.project?.numOfFloor}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Area:</span>

          <span>{projectDetail?.project?.area} m&#178;</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Estimated completion time:</span>

          <span>{projectDetail?.project?.estimatedTimeOfCompletion} days</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Image:</span>
          <NavLink
            to={projectDetail?.project?.landDrawingFileUrl}
            className="text-blue-500 hover:text-black italic"
          >
            View image
          </NavLink>
        </div>

        <div className="text-sm font-medium text-black text-right"></div>
      </div>
    </div>
  );
};

export default ProjectGrid;
