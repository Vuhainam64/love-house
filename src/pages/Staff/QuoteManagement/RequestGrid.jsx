import React from "react";
import { NavLink } from "react-router-dom";
import { ProjectStatusBadge, DateFormatter } from "../../../components";
import { Tag } from "antd";
import { AiOutlineForm } from "react-icons/ai";

import ViewRequestDetail from "./ViewRequestDetail";

function RequestGrid({ allRequest }) {
  return (
    <div className="h-[550px] overflow-y-auto -mt-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
      <div className="grid grid-cols-1 gap-4 md:hidden ">
        {allRequest.map((item, index) => (
          <div
            key={item.id}
            className="bg-white space-y-3 rounded-lg shadow px-8 py-5"
          >
            <div className="flex items-center space-x-5 text-sm">
              <div className="text-blue-500 font-bold hover:underline">
                #{index + 1}
              </div>

              <div className="text-gray-500">
                <DateFormatter dateString={item.createDate} />
              </div>
              <div>
                <ProjectStatusBadge projectStatus={item.projectStatus} />
              </div>
            </div>

            <div className="text-sm text-gray-700">
              Customer:
              <span className="ml-2 font-semibold">
                {item.account.firstName} {item.account.lastName}
              </span>
            </div>
            <div className="flex text-sm text-gray-700 space-x-3">
              <span>Description:</span>

              <div>
                <span className="text-red-500">{item.numOfFloor}</span> floor(s)
                - <span className="text-red-500">{item.area}</span> m&#178;
              </div>
            </div>
            <div className="flex text-sm text-gray-700 space-x-3">
              <span>Construction type:</span>
              {item.constructionType === 1 && <Tag color="cyan">Completed</Tag>}

              {item.constructionType === 0 && <Tag color="gold">Rough</Tag>}
            </div>

            <div className=" flex justify-end text-sm font-medium text-black text-right">
              {item.status === 0 && (
                <>
                  <NavLink
                    className=" text-green-600 font-semibold hover:text-black"
                    to={`/staff/config-project/${item.id}`}
                  >
                    <AiOutlineForm size={20} className="mr-2" />
                  </NavLink>
                  <ViewRequestDetail details={item} />
                </>
              )}
              {item.status !== 0 && (
                <NavLink
                  to={`/staff/project-detail/${item.id}`}
                  className="text-blue-500 hover:text-black"
                >
                  View Details
                </NavLink>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestGrid;
