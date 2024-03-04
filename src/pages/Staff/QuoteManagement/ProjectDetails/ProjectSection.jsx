import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProjectById } from "../../../../constants/apiQuotationOfStaff";
import {
  LoadingOverlay,
  ProjectStatusBadge,
  DateFormatter,
} from "../../../../components";

import ProjectGrid from "./Grid/ProjectGrid";

export default function ProjectSection({projectDetail}) {

  return (
    <>
      <div className="flex-1 p-5">
        <h1 className="text-xl font-semibold uppercase">Project</h1>

        <div className="p-5 h-auto">
          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                    Description
                  </th>
                  <th className=" p-3 text-sm font-semibold tracking-wide text-center">
                    Construction Type
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide ">
                    Tiled Area
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide ">
                    Wall Dimensions
                  </th>

                  <th className=" p-3 text-sm font-semibold tracking-wide text-left ">
                    Mixing Ratio
                  </th>

                  <th className=" p-3 text-sm font-semibold tracking-wide">
                    EstimatedTime Completion
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
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    {projectDetail?.project?.constructionType === 0
                      ? "Rough"
                      : "Completed"}
                  </td>
                  <td className="w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    {projectDetail?.project?.tiledArea} m<sup>2</sup>
                  </td>
                  <td className=" w-40 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
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
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    {projectDetail?.project?.estimatedTimeOfCompletion} days
                  </td>

                  <td className="p-3 text-sm text-gray-700 text-center"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <ProjectGrid projectDetail={projectDetail} />
        </div>
      </div>
    </>
  );
}
