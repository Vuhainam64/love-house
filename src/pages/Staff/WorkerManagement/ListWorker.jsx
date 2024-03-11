import React, { useEffect, useState } from "react";
import WorkerGrid from "./Grid/WorkerGrid";
import CreateWokerPrice from "./CreateWokerPrice";
import UpdateWorkerPrice from "./UpdateWorkerPrice";

import DeleteWorkerPrice from "./DeleteWorkerPrice";

import { CurrencyFormatter } from "../../../components";

export default function ListWorker({
  allWorker,
  handleReloadContent,
  fetchAllWorker,
}) {
  return (
    <>
      <div className="flex-1 p-5">
        <h1 className="text-xl font-semibold uppercase text-center">Worker Management</h1>
        <div className="text-right">
        <CreateWokerPrice
          onModalClose={handleReloadContent}
          fetchAllWorker={fetchAllWorker}
        />
        </div>
        
        <div className="p-5 h-auto">
          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                    No.
                  </th>
                  <th className=" p-3 text-sm font-semibold tracking-wide text-center">
                    Position
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide ">
                    Labor Cost (VNĐ)
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allWorker &&
                  allWorker.map((worker, index) => (
                    <tr
                      key={worker.id}
                      className="bg-white text-black text-left"
                    >
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {worker.positionName}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <CurrencyFormatter amount={worker.laborCost}/>
                      </td>
                      <td className="p-3 text-sm text-gray-700 text-center">
                        <div className="flex justify-center">
                          <UpdateWorkerPrice
                            workerDetail={worker}
                            onModalClose={handleReloadContent}
                            fetchAllWorker={fetchAllWorker}
                          />

                          <DeleteWorkerPrice
                            workerDetail={worker}
                            onDelete={handleReloadContent}
                            fetchAllWorker={fetchAllWorker}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <WorkerGrid allWorker={allWorker} />
        </div>
      </div>
    </>
  );
}
