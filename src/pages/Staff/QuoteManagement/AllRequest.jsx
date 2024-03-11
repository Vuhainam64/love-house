import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  ProjectStatusBadge,
  LoadingOverlay,
  DateFormatter,
} from "../../../components";
import { getAllRequestForStaff } from "../../../constants/apiQuotationOfStaff";
import { Tabs, Pagination, Tag } from "antd";

import { AiOutlineForm } from "react-icons/ai";
import ViewRequestDetail from "./ViewRequestDetail";
import RequestGrid from "./RequestGrid";

export default function AllRequest() {
  const [allRequest, setAllRequest] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedItems = allRequest.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async (status) => {
    try {
      const data = await getAllRequestForStaff(status);
      if (data && data.result) {
        const sortedData = data.result.data.slice().sort((a, b) => {
          return new Date(b.createDate) - new Date(a.createDate);
        });
        setAllRequest(sortedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(0);
  }, []);

  const onChange = async (key) => {
    setCurrentPage(1);
    await fetchData(key);
  };

  const items = [
    {
      key: "0",
      label: "Pending",
    },
    {
      key: "1",
      label: "Processing",
    },
    {
      key: "2",
      label: "Under Construction",
    },
  ];

  return (
    <>
      <LoadingOverlay loading={loading} />

      <div className="h-screen flex-1 overflow-hidden bg-gray-100">
        <h1 className=" text-2xl font-semibold mt-2 mb-2 uppercase text-center">
          Quote Request
        </h1>
        <div className="px-5  bg-gray-100 ">
          <Tabs
            defaultActiveKey="0"
            items={items}
            onChange={onChange}
            type="card"
            style={{ zIndex: 1 }}
          />

          <div className="rounded-lg rounded-tl-none shadow hidden md:block -mt-4">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">
                    No.
                  </th>
                  <th className="w-36 p-3 text-sm font-semibold tracking-wide text-left">
                    Customer
                  </th>
                  <th className="w-56 p-3 text-sm font-semibold tracking-wide text-left">
                    Address
                  </th>
                  <th className="w-52 p-3 text-sm font-semibold tracking-wide text-left">
                    Description
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Date
                  </th>

                  <th className="w-44 p-3 text-sm font-semibold tracking-wide text-left">
                    Status
                  </th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedItems.map((item, index) => {
                  const itemNumber = startIndex + index + 1;
                  return (
                    <tr key={item.id} className="bg-white text-black text-left">
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {itemNumber}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.account.firstName} {item.account.lastName}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.addressProject}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        Floors: {item.numOfFloor}, Area: {item.area} m&#178;
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <DateFormatter dateString={item.createDate} />
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <ProjectStatusBadge projectStatus={item.status} />
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap flex items-center">
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-2 justify-center hidden md:flex">
            <Pagination
              total={allRequest.length}
              pageSize={pageSize}
              current={currentPage}
              onChange={handlePageChange}
            />
          </div>

          <RequestGrid allRequest={allRequest} />
        </div>
      </div>
    </>
  );
}
