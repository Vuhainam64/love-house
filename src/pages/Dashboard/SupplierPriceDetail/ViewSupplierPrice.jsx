import React, { useEffect, useState } from "react";
import { Table, Space, Button, Modal } from "antd";
import DatePicker from "react-datepicker";

import { IoPricetagsSharp } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";

import { getAllQuotationPrices } from "../../../api";
import { MutatingDots } from "../../../components";

const ViewSupplierPrice = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quotationPrices, setQuotationPrices] = useState([]);
  const [uniqueSupplierQuotations, setUniqueSupplierQuotations] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [sortedData, setSortedData] = useState([]);
  const [materialDetail, setMaterialDetail] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchAllQuotationPrices = async () => {
      try {
        const data = await getAllQuotationPrices(1, 100);
        setQuotationPrices(data.result.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching quotation prices:", error);
        setIsLoading(false);
      }
    };
    fetchAllQuotationPrices();
  }, []);

  useEffect(() => {
    if (!isLoading && quotationPrices.length > 0) {
      const uniqueSuppliersMap = new Map();

      quotationPrices.forEach((price) => {
        const supplierQuotation = price.supplierPriceQuotation;
        const supplier = supplierQuotation?.supplier;
        const supplierId = supplier?.id;

        if (supplierId && !uniqueSuppliersMap.has(supplierId)) {
          uniqueSuppliersMap.set(supplierId, supplier);
        }
      });

      const uniqueSupplierQuotationsArray = Array.from(
        uniqueSuppliersMap.values()
      );

      setUniqueSupplierQuotations(uniqueSupplierQuotationsArray);
    }
  }, [isLoading, quotationPrices]);

  const handleSupplierChange = (event) => {
    const selectedSupplierId = event.target.value;
    const supplier = uniqueSupplierQuotations.find(
      (sup) => sup.id === selectedSupplierId
    );
    setSelectedSupplier(supplier);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSortSubmit = () => {
    // Implement your sorting logic based on selectedSupplier and selectedDate
    console.log("Sorting based on:", selectedSupplier, selectedDate);

    // Replace this with your actual sorting logic
    const sortedResult = quotationPrices.filter((item) => {
      const supplierName =
        item.supplierPriceQuotation.supplier.supplierName.toLowerCase();
      const selectedSupplierName =
        selectedSupplier?.supplierName.toLowerCase() || "";

      const date = new Date(item.supplierPriceQuotation.date);
      const selectedMonth = selectedDate?.getMonth() + 1;
      const selectedYear = selectedDate?.getFullYear();

      return (
        supplierName.includes(selectedSupplierName) &&
        (!selectedDate ||
          (date.getMonth() + 1 === selectedMonth &&
            date.getFullYear() === selectedYear))
      );
    });

    console.log("Sorted Result:", sortedResult);

    setSortedData(sortedResult);
  };

  const columns = [
    {
      title: "Supplier",
      dataIndex: "supplierName",
      key: "supplierName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "MOQ",
      dataIndex: "moq",
      key: "moq",
    },
    {
      title: "Material",
      dataIndex: "materialName",
      key: "materialName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="text-white bg-green-500 hover:bg-green-600"
            onClick={() => handleViewDetail(record.material)}
          >
            View Detail
          </Button>
        </Space>
      ),
    },
  ];

  const data = sortedData.map((item) => ({
    key: item.id,
    supplierName: item.supplierPriceQuotation.supplier.supplierName,
    date: new Date(item.supplierPriceQuotation.date).toLocaleDateString(),
    moq: item.moq,
    price: item.price,
    material: item.material,
    materialName: item.material.name,
  }));

  const handleViewDetail = (material) => {
    console.log("Material Detail:", material);
    setMaterialDetail(material);
    setOpenModal(true);
  };

  const getUnitName = (unitMaterial) => {
    switch (unitMaterial) {
      case 0:
        return "KG";
      case 1:
        return "M3";
      case 2:
        return "BAR";
      case 3:
        return "ITEM";
      default:
        return "Unknown Unit";
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <MutatingDots />
        </div>
      ) : (
        <div className="flex flex-col p-8 text-gray-900">
          {/* title  */}
          <div className="flex items-center space-x-2 text-xl">
            <IoPricetagsSharp />
            <div>Supplier</div>
            <FaChevronRight />
            <div>Supplier Price Detail</div>
            <FaChevronRight />
          </div>
          <div className="text-2xl text-green-400 font-semibold py-4">
            View Supplier Price
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="mb-4">
                <label
                  htmlFor="supplier"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Supplier
                </label>
                <select
                  id="supplier"
                  name="supplier"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-64"
                  onChange={handleSupplierChange}
                  value={selectedSupplier ? selectedSupplier.id : ""}
                >
                  <option value="" disabled>
                    Select Supplier
                  </option>
                  {uniqueSupplierQuotations.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.supplierName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  className="mt-1 p-2 border border-gray-300 rounded-md w-64"
                />
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSortSubmit}
              >
                Sort
              </button>
            </div>

            <div className="col-span-2">
              {/* Display Sorted Data using Ant Design Table */}
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
              />
            </div>
          </div>

          {/* Material Detail Modal */}
          <Modal
            title="Material Detail"
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={null}
            className="flex items-center justify-center bg-white shadow-md rounded-md pt-6"
          >
            {materialDetail && (
              <>
                <p className="text-lg font-bold mb-2">
                  ID: {materialDetail.id}
                </p>
                <p className="mb-2">Name: {materialDetail.name}</p>
                <p className="mb-2">
                  Type:{" "}
                  {materialDetail.materialType === 0
                    ? "Raw Materials"
                    : "Furniture"}
                </p>
                <p className="mb-4">
                  Unit: {getUnitName(materialDetail.unitMaterial)}
                </p>
              </>
            )}
          </Modal>
        </div>
      )}
    </>
  );
};

export default ViewSupplierPrice;
