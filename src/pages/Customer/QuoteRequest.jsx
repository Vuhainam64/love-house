import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ProjectStatusBadge,
  LoadingOverlay,
  DateFormatter,
} from "../../components";
import { getAllRequest } from "../../constants/apiQuotationOfCustomer";
import { Tabs } from "antd";
import QuoteRequestGrid from "./QuoteRequestGrid";
import ViewRequestDetail from "../Staff/QuoteManagement/ViewRequestDetail";

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

      <div className="h-screen flex-1 overflow-hidden bg-gray-100">
        <h1 className="text-2xl font-semibold pb-5 mt-5 uppercase text-center">
          Quote Request
        </h1>
        <div className="p-5 bg-gray-100 ">
          {/* Web */}
          <Tabs defaultActiveKey="0" items={items} onChange={onChange} />
          <div className="rounded-lg shadow hidden md:block">
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
                    <tr key={item.id} className="bg-white text-black text-left">
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
                        <ProjectStatusBadge projectStatus={item?.status} />
                      </td>
                      <td className="p-3 text-sm text-blue-500 hover:text-gray-700 whitespace-wrap">
                      {item.status === 0 && (
                            <ViewRequestDetail details={item} />
                        )}
                        {item.status !== 0 && (
                          <>
                            <NavLink to={`/customer/project-detail/${item.id}`}>
                              View Detail
                            </NavLink>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Mobile */}
          <QuoteRequestGrid allRequest={allRequest} />
        </div>
      </div>
    </>
  );
}
