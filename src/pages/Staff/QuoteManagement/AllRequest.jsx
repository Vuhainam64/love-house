import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  StaffSidebar,
  ProjectStatusBadge,
  LoadingOverlay,
  TabsComponent,
  DateFormatter,
  DBHeader,
} from "../../../components";
import { getAllRequestForStaff } from "../../../constants/apiQuotationOfStaff";



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

  
  const fetchData = async () => {
    try {
      const data = await getAllRequestForStaff();
      if (data && data.result) {
        const sortedData = data.result.data.slice().sort((a, b) => {
          return new Date(b.createDate) - new Date(a.createDate);
        });
        setAllRequest(sortedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(); 
  }, []);


  // const filterProjectsByTab = (index) => {
  //   const filterFunction = tabs[index].filter;
  //   const filtered = allRequest.filter(filterFunction);
  //   setFilteredProjects(filtered);
  // };

  const handleTabChange = (index) => {
    setSelectedTab(index);
    filterProjectsByTab(index);
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="flex overflow-hidden">
        <StaffSidebar />

        <div className="h-screen overflow-y-auto flex-1  bg-gray-100 ">
          <DBHeader/>
          <h1 className="text-2xl font-semibold pb-2 mt-5 uppercase text-center">
            Quote Request
          </h1>
          {/* <TabsComponent
            items={tabs}
            initialTabTitle={currentContent}
            onTabChange={handleTabChange}
            defaultTabIndex={0}
          /> */}

          <div className="p-5 h-screen bg-gray-100 ">
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                      No.
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                      Project ID
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                      Details
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                      Date
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                      Customer
                    </th>
                    {/* <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Phone
                    </th> */}
                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                      Status
                    </th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
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
                          {item.id}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          Floors: {item.numOfFloor}, Area: {item.area} m
                          <sup>2</sup>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <DateFormatter dateString={item.createDate} />
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.account.firstName} {item.account.lastName}
                        </td>
                        {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.account.phoneNumber} 
                        </td> */}
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

                          {item.projectStatus !== 0 && (
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

            <div className="grid grid-cols-1 gap-4 md:hidden">
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
                    <div >
                      <ProjectStatusBadge projectStatus={item.projectStatus} />
                    </div>
                  </div>

                  <div className="text-sm text-gray-700">
                    Floors: {item.numOfFloor}, Area: {item.area} m<sup>2</sup>
                  </div>
                  <div className="text-sm text-gray-700">
                    Customer:
                    <span className="ml-2 font-semibold">
                      {item.account.firstName} {item.account.lastName}
                    </span>
                  </div>

                  <div className="text-sm font-medium text-black text-right">
                    {item.projectStatus === 0 && (
                      <NavLink to={`/staff/config-project/${item.id}`}>
                        <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-400">
                          Config
                        </button>
                      </NavLink>
                    )}

                    {item.projectStatus !== 0 && (
                      <>
                        <NavLink to={`/staff/project-detail/${item.id}`}>
                          <button className="bg-baseGreen text-white font-semibold px-4 py-2 rounded hover:bg-green-600">
                            View Detail
                          </button>
                        </NavLink>
                      </>
                    )}
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
