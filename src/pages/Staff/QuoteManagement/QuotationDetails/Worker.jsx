import React, { useEffect, useState } from "react";

import { CurrencyFormatter } from "../../../../components";

export default function Worker({ quoteDetail }) {
  return (
    <>
      <div className="flex-1 p-5">
        <div className="px-2 mb-4 pb-24 -mt-4">
          <div className="font-semibold border-b-2 mb-4 flex space-x-4">
            <h4 className="pb-2 uppercase">Wokers for project</h4>
          </div>
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
                      Average Labor Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {quoteDetail.workerForProjects.map((item, index) => {
                    const total = item.quantity * item.exportLaborCost;
                    return (
                      <tr
                        key={item.id}
                        className="bg-white text-black text-left"
                      >
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>No materials available.</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-16 pt-4 px-8 md:hidden h-[200px] overflow-auto">
            {quoteDetail.workerForProjects &&
              quoteDetail.workerForProjects.map((item, index) => (
                <div
                  key={item.id}
                  className=" space-y-4 rounded-lg shadow px-8 py-5 bg-slate-100"
                >
                  <div className="flex items-center justify-between space-x-5 text-sm">
                    <div className="text-blue-500 text-xl font-bold hover:underline">
                      #{index + 1}
                      <span className="font-semibold text-xl ml-4">
                        {item.workerPrice.positionName}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Quantity:</span>
                    {item.quantity}
                  </div>

                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Average Labor Cost:</span>
                    <CurrencyFormatter amount={item.exportLaborCost} />
                    /person
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
