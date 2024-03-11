import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getQuoteDetailForCustomer } from "../../../constants/apiQuotationOfCustomer";

import { CurrencyFormatter, LoadingOverlay } from "../../../components";
import ViewExportQuotationModal from "../ExportQuotationDetail/ViewExportQuotationModal";
import { Button } from "antd";


export default function MaterialDetailSection({ quoteDetail }) {
  const [exportModal, setExportModal] = useState(false)
  const [data, setData] = useState(false)
  const handleExportView = (item) => {
    setData(item.id)
    setExportModal(true)

  }
  return (
    <>
      <h1 className="text-xl font-semibold mt-6 py-5 uppercase pl-5">Details of materials</h1>
      <div className="px-5 pb-5 h-auto ">
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          {quoteDetail.quotationDetails &&
            quoteDetail.quotationDetails.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className=" p-3 text-sm font-semibold tracking-wide text-center">
                    No.
                  </th>
                  <th className=" p-3 text-sm font-semibold tracking-wide text-center">
                    Material name
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    Unit
                  </th>
                  <th className=" p-3 text-sm font-semibold tracking-wide text-center">
                    Material type
                  </th>
                  <th className=" p-3 text-sm font-semibold tracking-wide text-right">
                    Quantity
                  </th>
                  <th className=" p-3 text-sm font-semibold tracking-wide text-right">
                    Total
                  </th>
                  <th className=" p-3 text-sm font-semibold tracking-wide text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quoteDetail.quotationDetails.map((item, index) => {
                  return (
                    <tr key={item.id} className="bg-white text-black text-left">
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {index + 1}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {item.material.name}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {(() => {
                          switch (item.material.unitMaterial) {
                            case 0:
                              return "Kg";
                            case 1:
                              return "m³";
                            case 2:
                              return "Bar";
                            case 3:
                              return "Item";
                            default:
                              return "";
                          }
                        })()}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {item.material.materialType === 0
                          ? "Raw Material"
                          : "Funiture"}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                        {item.quantity}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-right">
                        <CurrencyFormatter amount={item.total} />
                      </td>
                      <td className="flex justify-end items-center">
                        <Button
                          className="text-xs font-semibold leading-6 text-white bg-baseGreen hover:bg-green-600 rounded-lg transition duration-200"
                          onClick={() => handleExportView(item)}
                        >
                          View export
                        </Button>
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

        <div className="grid grid-cols-1 gap-16 px-8 pt-4 md:hidden h-[300px] overflow-auto">
          {quoteDetail.quotationDetails &&
            quoteDetail.quotationDetails.map((item, index) => (
              <div
                key={item.id}
                className=" space-y-4 rounded-lg shadow px-8 py-5 bg-slate-100"
              >
                <div className="flex items-center justify-between space-x-5 text-sm">
                  <div className="text-blue-500 text-xl font-bold hover:underline">
                    #{index + 1}
                    <span className="font-semibold text-xl ml-4">
                      {item.material.name}
                    </span>
                  </div>


                </div>

                <div className="flex justify-between text-sm text-gray-700">
                  <span>Unit:</span>
                  {(() => {
                    switch (item.material.unitMaterial) {
                      case 0:
                        return "Kg";
                      case 1:
                        return "m³";
                      case 2:
                        return "Bar";
                      case 3:
                        return "Item";
                      default:
                        return "";
                    }
                  })()}
                </div>

                <div className="flex justify-between text-sm text-gray-700">
                  <span>Construction Type:</span>
                  {item.material.materialType === 0
                    ? "Raw Material"
                    : "Funiture"}
                </div>

                <div className="flex justify-between text-sm text-gray-700">
                  <span>Quantity</span>
                  {item.quantity}
                </div>

                <div className="flex justify-between text-sm text-gray-700">
                  <span className="font-semibold">Total:</span>
                  <CurrencyFormatter amount={item.total} />
                </div>
              </div>
            ))}
        </div>
      </div>
      <ViewExportQuotationModal
        data={data}
        visible={exportModal}
        onClose={() => setExportModal(false)}
      />
    </>
  );
}
