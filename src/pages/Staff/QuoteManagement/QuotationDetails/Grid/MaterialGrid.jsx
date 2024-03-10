import React from "react";
import FormUpdateMaterialDetail from "../Manage/FormUpdateMaterialDetail";
import DeleteMaterialDetail from "../Manage/DeleteMaterialDetail";
import CurrencyFormatter from "../../../../../components/Common/CurrencyFormatter";

const MaterialGrid = ({ quote, quoteDetail, handleReloadContent }) => {
  return (
    <div className="grid grid-cols-1 gap-16 px-8 pt-4 pb-16 mb-24 md:hidden h-[300px] overflow-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
      {quoteDetail &&
        quoteDetail.map((item, index) => (
          <div
            key={item.id}
            className="bg-gray-50 border border-gray-300 space-y-4 rounded-lg shadow px-20 py-5 "
          >
            <div className="flex items-center justify-between space-x-5 text-sm">
              <div className="text-blue-500 text-xl font-bold hover:underline">
                #{index + 1}
                <span className="font-semibold text-xl ml-4">
                  {item.material.name}
                </span>
              </div>

              {quote?.quotation?.quotationStatus === 0 && (
                <div>
                  <div className="flex justify-center">
                    <div>
                      <FormUpdateMaterialDetail
                        quoteDetail={item}
                        onModalClose={handleReloadContent}
                      />
                    </div>

                    <div>
                      <DeleteMaterialDetail
                        quoteDetail={item}
                        onDelete={handleReloadContent}
                      />
                    </div>
                  </div>
                </div>
              )}
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
              {item.material.materialType === 0 ? "Raw Material" : "Funiture"}
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
  );
};

export default MaterialGrid;
