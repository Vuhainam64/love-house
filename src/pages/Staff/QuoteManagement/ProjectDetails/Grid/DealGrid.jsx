import React from "react";
import CreateDealByStaff from "../../DealQuotationDetail/CreateDealByStaff";

const DealGrid = ({ projectDetail, onModalClose, handleReloadContent }) => {


  const renderCreateDealComponent = () => {
    const dealing = projectDetail?.quotationDealings?.[0];
    const quotation = projectDetail?.quotations?.[0];

    return (
      !(
        dealing &&
        quotation &&
        dealing.materialDiscount <= quotation.rawMaterialDiscount &&
        dealing.furnitureDiscount <= quotation.furnitureDiscount &&
        dealing.laborDiscount <= quotation.laborDiscount
      ) && <CreateDealByStaff onModalClose={handleReloadContent} />
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      <div
        key={projectDetail.id}
        className="bg-gray-50 border border-gray-300  space-y-3 rounded-lg shadow px-8 py-5"
      >
        <div className="flex justify-between sm:mb-3 pt-2">
          <span className="flex items-center">Material Discount:</span>
          <div className="text-red-500">
            {`-${Math.abs(
              projectDetail?.quotationDealings[0]?.materialDiscount
            )}%`}
          </div>
        </div>

        <div className="flex justify-between sm:mb-3 pt-2">
          <span className="flex items-center">Furniture Discount:</span>
          <div className="text-red-500">
            {`-${Math.abs(
              projectDetail?.quotationDealings[0]?.furnitureDiscount
            )}%`}
          </div>
        </div>

        <div className="flex justify-between sm:mb-3 pt-2">
          <span className="flex items-center">Labor Discount:</span>
          <div className="text-red-500">
            {`-${Math.abs(
              projectDetail?.quotationDealings[0]?.laborDiscount
            )}%`}
          </div>
        </div>

        <div className="pt-4 text-right">{renderCreateDealComponent()}</div>
      </div>
    </div>
  );
};

export default DealGrid;
