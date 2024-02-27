import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { CustomerSidebar, ProjectStatusBadge, LoadingOverlay } from "../../components";
import { getAllRequest } from "../../constants/apiQuotationOfCustomer";


export default function QuoteRequest() {
  const [loading, setLoading] = useState(true);
  const [allRequest, setAllRequest] = useState([]);
  const { accountId } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user?.user);

  const customerId = user.id;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAllRequest = async () => {
      try {
        const data = await getAllRequest(customerId);
        if (data && data.result) {
          const formattedData = data.result.data.map((item) => ({
            ...item,
            createDate: formatDate(item.createDate),
          }));
          setAllRequest(formattedData);
          setLoading(false);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching house roof data:", error);
      }
    };
    fetchAllRequest();
  }, [customerId]);

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="flex">
        <CustomerSidebar />

        <div className="h-screen flex-1 p-7">
          <h1 className="text-2xl font-semibold pb-5">Quote Request</h1>
          <div className="p-5 h-screen bg-gray-100 ">
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
                          {item.createDate}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <ProjectStatusBadge
                            projectStatus={item.projectStatus}
                          />
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.projectStatus !== 0 && (
                            <>
                              <NavLink
                                to={`/customer/project-detail/${item.id}`}
                              >
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {allRequest.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white space-y-4 p-4 rounded-lg shadow"
                >
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="text-blue-500 font-bold hover:underline">
                      #{index + 1}
                    </div>
                    <div className="text-sm text-gray-700">
                      Floors: {item.numOfFloor}, Area: {item.area}
                    </div>
                    <div className="text-gray-500">{item.createDate}</div>
                    <div>
                      <ProjectStatusBadge projectStatus={item.projectStatus} />
                    </div>
                    <div>Action</div>
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
