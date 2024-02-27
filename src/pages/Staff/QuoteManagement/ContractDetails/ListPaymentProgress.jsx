import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

import {
  getContractProgressById,
  getContractById,
} from "../../../../constants/apiContract";

import {
  StaffSidebar,
  LoadingOverlay,
  DateFormatter,
  PaymentStatusBadge,
  CurrencyFormatter,
} from "../../../../components";
import DeleteProgress from "./ManageContract/DeleteProgress";
export default function ListPaymentProgress() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [reloadContent, setReloadContent] = useState(false);
  const [progressDetail, setProgressDetail] = useState([]);
  const [contract, setContract] = useState({});
  const totalPriceInProgress = progressDetail.reduce((total, item) => {
    return total + item.payment.price;
  }, 0);

  const isTotalPriceEqual = totalPriceInProgress === contract.total;

  const fetchContract = async () => {
    try {
      const data = await getContractById(id);

      if (data && data.result) {
        setContract(data.result.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching progress detail:", error);
    }
  };

  useEffect(() => {
    fetchContract();
  }, [id]);

  const fetchProgressDetail = async () => {
    try {
      const data = await getContractProgressById(id);

      if (data && data.result) {
        setProgressDetail(data.result.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching progress detail:", error);
    }
  };

  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };

  useEffect(() => {
    fetchProgressDetail();
  }, [id, reloadContent]);
  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="flex">
        <StaffSidebar />

        <div className="h-screen flex-1 p-7">
          <h1 className="text-3xl font-semibold pb-4 pl-4">
            Payment Progress Detail
          </h1>

          <div className="flex items-center">
            {/* <DeleteProgress
              contractDetail={contract.id}
              onDelete={handleReloadContent}
            /> */}

            <div className="ml-5">
              {isTotalPriceEqual ? null : (
                <NavLink
                  to={`/staff/create-list-progress/${id}`}
                  
                >
                  <button className="bg-green-600 text-white px-4 py-2 rounded">
                  + Create List Progress
                  </button>
                  
                </NavLink>
              )}
            </div>
          </div>

          {/* <button className="flex items-center" onClick={handleBack}>
          Back
        </button>
       */}

          <div className="p-5 h-screen bg-gray-100 ">
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className=" p-3 text-sm font-semibold tracking-wide">
                      No.
                    </th>
                    <th className=" p-3 text-sm font-semibold tracking-wide">
                      Name
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide">
                      Description
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-right">
                      Price
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide">
                      Date
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide">
                      Payment Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {progressDetail &&
                    progressDetail.map((item, index) => {
                      return (
                        <tr key={item.id} className="bg-white text-black ">
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {index + 1}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {item.name}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            {item.payment.content}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                            <CurrencyFormatter amount={item.payment.price} />
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            <DateFormatter dateString={item.date} />
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                            <PaymentStatusBadge
                              paymentStatus={item.payment.paymentStatus}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
