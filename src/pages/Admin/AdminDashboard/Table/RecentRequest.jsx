import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllRequestForStaff } from "../../../../constants/apiQuotationOfStaff";
import { ProjectStatusBadge, DateFormatter, LoadingOverlay, DBHeader } from "../../../../components";
import { FaArrowRight } from "react-icons/fa6";

export default function RecentRequest() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getAllRequestForStaff(0); 
      if (data && data.result) {
        const sortedData = data.result.data.slice().sort((a, b) => {
          return new Date(b.createDate) - new Date(a.createDate);
        });
        const recentData = sortedData.slice(0, 3);
        setPendingRequests(recentData);
        //setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <>
      <div className="h-220 flex-1">
        <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border rounded-[4px] border-[#EDEDED] shadow-md">
          <h2 className="font-medium">Recent Requests</h2>
          <NavLink to="/staff/all-request">
          <div className="flex items-center text-sm text-blue-500 hover:text-black">See all<FaArrowRight className="ml-2"/> </div>
          </NavLink>
         
        </div>

        <div className="h-220 rounded-lg shadow md:block">
          <table className="w-full h-220  mx-2">
            <tbody className="divide-y ml-4">
              {pendingRequests.map((item, index) => (
                <tr key={item.id} className="text-black text-left ml-4">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.account.firstName} {item.account.lastName}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <DateFormatter dateString={item.createDate} />
                  </td>
                  <td className="p-3 text-sm text-red-700 hover:text-black font-extralight italic  whitespace-nowrap">
                    <NavLink className="mx-2" to={`/staff/config-project/${item.id}`}>Config</NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
