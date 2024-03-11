import React from "react";
import { NavLink } from "react-router-dom";
import { ProjectStatusBadge, DateFormatter } from "../../components"
import { CgEnter } from "react-icons/cg";

function QuoteRequestGrid({ allRequest }) {
  return (
    <div className="h-[550px] overflow-y-auto -mt-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
         <div className="grid grid-cols-1 gap-4 md:hidden">
            {allRequest.map((item, index) => (
              <div
                key={item.id}
                className="bg-white space-y-3 rounded-lg shadow px-8 py-5"
              >
                <div className="flex items-center justify-between space-x-5 text-sm">
                  <div className="flex">
                    <div className="text-blue-500 font-bold hover:underline">
                      #{index + 1}
                    </div>

                    <div className="text-gray-500 ml-2">
                      <DateFormatter dateString={item.createDate} />
                    </div>
                  </div>

                  <div>
                    <ProjectStatusBadge projectStatus={item.status} />
                  </div>
                </div>

                <div className="text-sm text-gray-700">
                  Floors: {item.numOfFloor}, Area: {item.area} m<sup>2</sup>
                </div>

                <div className="text-sm font-medium text-black text-right">
                  {item.status !== 0 && (
                    <NavLink to={`/customer/project-detail/${item.id}`}>
                      <div className="flex items-center justify-center text-green-600 hover:text-baseGreen">
                        View Detail <CgEnter size={25} className="ml-2" />
                      </div>
                    </NavLink>
                  )}
                </div>
              </div>
            ))}
          </div>
    </div>
  )
}

export default QuoteRequestGrid