import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {getQuotationById} from "../../../../constants/apiQuotationOfStaff"

import { QuotationStatusBadge, CurrencyFormatter, LoadingOverlay } from "../../../../components"



export default function Worker() {
    const { id } = useParams();
    const [quoteDetail, setQuoteDetail] = useState([]);

    const fetchQuoteDetail = async () => {
        try {
          const data = await getQuotationById(id);
    
          if (data && data.result) {
            setQuoteDetail(data.result.data);
            //setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching quote detail:", error);
        }
      };
    
      useEffect(() => {
        fetchQuoteDetail();
      }, [id]);
  return (
    <>
    <h1 className="text-xl font-semibold pb-5 pt-12 uppercase">Workers for project</h1>
    <div className="px-5 pb-5 h-auto ">
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        {quoteDetail.workerForProjects &&
        quoteDetail.workerForProjects.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className=" p-3 text-sm font-semibold tracking-wide text-center">
                  No.
                </th>
                <th className=" p-3 text-sm font-semibold tracking-wide text-center">
                  Position
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-right">
                  Quantity
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-right">
                  Labor Cost
                </th>
                <th className=" p-3 text-sm font-semibold tracking-wide text-right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {quoteDetail.workerForProjects.map((item, index) => {
                const total = item.quantity * item.exportLaborCost;
                return (
                  <tr key={item.id} className="bg-white text-black text-left">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      {index + 1}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      {item.workerPrice.positionName}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                      {item.quantity}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                      <CurrencyFormatter amount={item.exportLaborCost} />
                      /person
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                      <CurrencyFormatter amount={total} />
                    </td>
                  </tr>
                );
              })}
             
            </tbody>
          </table>
        ) : (
          <p>No materials available.</p>
        )}
      </div>
    </div>
  </>
  )
}

