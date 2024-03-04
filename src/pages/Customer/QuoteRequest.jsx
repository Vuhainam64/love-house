import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CustomerSidebar,
  ProjectStatusBadge,
  LoadingOverlay,
  DateFormatter,
  DBHeader,
} from "../../components";
import { getAllRequest } from "../../constants/apiQuotationOfCustomer";
import { Tabs } from "antd";
import { CgEnter } from "react-icons/cg";

export default function QuoteRequest() {
  const [loading, setLoading] = useState(true);
  const [allRequest, setAllRequest] = useState([]);
  const { accountId } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user?.user);

  const customerId = user.id;
  const fetchAllRequest = async (status) => {
    try {
      setLoading(true);
      const data = await getAllRequest(customerId, status);
      if (data && data.result) {
        const sortedData = data.result.data.slice().sort((a, b) => {
          return new Date(b.createDate) - new Date(a.createDate);
        });
        setAllRequest(sortedData);
        setLoading(false);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching house roof data:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllRequest(0);
  }, [customerId]);
  const onChange = async (key) => {
    console.log(key);
    await fetchAllRequest(key);
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
      <div className="flex overflow-hidden">
        <CustomerSidebar />

        <div className="h-screen flex-1 overflow-y-auto bg-gray-100">
          <DBHeader />
          <h1 className="text-2xl font-semibold pb-5 mt-5 uppercase text-center">
            Quote Request
          </h1>
          <div className="p-5 h-screen bg-gray-100 ">
            {/* Web */}
            <Tabs defaultActiveKey="0" items={items} onChange={onChange} />
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                      No.
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Details
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Construction Type
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Date
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                      Status
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allRequest.map((item, index) => {
                    return (
                      <tr
                        key={item.id}
                        className="bg-white text-black text-left"
                      >
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          Floors: {item.numOfFloor}, Area: {item.area}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.constructionType === 0
                            ? "Rough Construction"
                            : "Completed Construction"}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <DateFormatter dateString={item.createDate} />
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <ProjectStatusBadge
                            projectStatus={item?.status}
                          />
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {
                            <>
                              <NavLink
                                to={`/customer/project-detail/${item.id}`}
                              >
                                View Detail
                              </NavLink>
                            </>
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Mobile */}
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

                    <div >
                      <ProjectStatusBadge projectStatus={item.status} />
                    </div>
                  </div>

                  <div className="text-sm text-gray-700">
                    Floors: {item.numOfFloor}, Area: {item.area} m<sup>2</sup>
                  </div>

                  <div className="text-sm font-medium text-black text-right">
                    {
                      // <NavLink to={`/customer/project-detail/${item.id}`}>
                      //   <button className="bg-baseGreen text-white font-semibold px-4 py-2 rounded hover:bg-red-400">
                      //     View Detail
                      //   </button>
                      // </NavLink>

                      <NavLink to={`/customer/project-detail/${item.id}`}>
                        <div className="flex items-center justify-center text-green-600 hover:text-baseGreen">
                          View Detail <CgEnter size={25} className="ml-2" />
                        </div>
                      </NavLink>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
