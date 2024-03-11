import React, { useEffect, useState } from "react";
import UpdateWorkerPrice from "../UpdateWorkerPrice";
import DeleteWorkerPrice from "../DeleteWorkerPrice";
import { CurrencyFormatter } from "../../../../components";

function WorkerGrid({ allWorker }) {
  const [reloadContent, setReloadContent] = useState(false);
  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };
  return (
    <div className="grid grid-cols-1 gap-4 md:hidden pb-12">
      {allWorker &&
        allWorker.map((worker, index) => (
          <div
            key={worker.id}
            className="bg-white space-y-3 rounded-lg shadow px-8 py-5"
          >
            <div className="flex items-center space-x-5 text-sm">
              <div className="text-blue-500 font-bold hover:underline">
                #{index + 1}
              </div>

              <div className="text-blue-500 text-xl font-semibold">
                {worker.positionName}
              </div>
            </div>

            <div className="text-sm text-gray-700">
              Labor cost: <CurrencyFormatter amount={worker.laborCost} /> VNĐ
            </div>

            <div className="text-sm font-medium text-black text-right">
              <div className="flex justify-center">
                <UpdateWorkerPrice
                  workerDetail={worker}
                  onModalClose={handleReloadContent}
                />

                <DeleteWorkerPrice
                  workerDetail={worker}
                  onDelete={handleReloadContent}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default WorkerGrid;
