import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StaffSidebar from "../../../components/Sidebar/StaffSidebar";
import { getAllRequestForStaff } from "../../../constants/apiQuotationOfStaff";
import ProjectStatusBadge from "../../../components/QuotationComponent/Status/ProjectStatusBadge";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
import TabsComponent from "../../../components/Tabs/TabsComponent";
import DateFormatter from "../../../components/Common/DateFormatter";

export default function AllRequest() {
  const [allRequest, setAllRequest] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredProjects, setFilteredProjects] = useState(allRequest);
  const tabs = [
    { title: "New", filter: (item) => item.projectStatus === 0 },
    { title: "Processing", filter: (item) => item.projectStatus === 1 },
  ];
  const [currentContent, setCurrentContent] = useState(tabs[0].title);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAllRequestForStaff = async () => {
      try {
        const data = await getAllRequestForStaff();
        if (data && data.result) {
          const formattedData = data.result.data.map((item) => ({
            ...item,
            createDate: formatDate(item.createDate),
          }));
          setAllRequest(formattedData);

          filterProjectsByTab(selectedTab);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchAllRequestForStaff();
  }, []);

  const filterProjectsByTab = (index) => {
    const filterFunction = tabs[index].filter;
    const filtered = allRequest.filter(filterFunction);
    setFilteredProjects(filtered);
  };

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

  const handleTabChange = (index) => {
    setSelectedTab(index);
    filterProjectsByTab(index);
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="flex">
        <StaffSidebar />

        <div className="h-screen flex-1 p-7">
          <h1 className="text-2xl font-semibold pb-5">Quote Request</h1>
          <TabsComponent
            items={tabs}
            initialTabTitle={currentContent}
            onTabChange={handleTabChange}
            defaultTabIndex={0}
          />

          <div className="p-5 h-screen bg-gray-100 ">
            <div className="overflow-auto rounded-lg shadow  md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                      No.
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                      Project ID
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Details
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
                  {filteredProjects.map((item, index) => {
                    return (
                      <tr
                        key={item.id}
                        className="bg-white text-black text-left"
                      >
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.id}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          Floors: {item.numOfFloor}, Area: {item.area}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <DateFormatter dateString={item.createDate} />
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <ProjectStatusBadge
                            projectStatus={item.projectStatus}
                          />
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.projectStatus === 0 && (
                            <NavLink to={`/staff/config-project/${item.id}`}>
                              Config
                            </NavLink>
                          )}

                          {item.projectStatus === 1 && (
                            <>
                              <NavLink to={`/staff/project-detail/${item.id}`}>
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

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
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
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
