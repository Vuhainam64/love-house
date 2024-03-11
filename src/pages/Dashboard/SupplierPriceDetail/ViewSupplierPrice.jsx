import React, { useState, useEffect } from "react";
import { Select, DatePicker, Button, Table, Modal, Input } from "antd";
import { toast } from "react-toastify";
import moment from "moment";

import { IoPricetagsSharp } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";

import {
  getAllSuppliers,
  getLatestQuotationPriceBySupplierName,
  importMaterial,
} from "../../../api";

const { Option } = Select;

const ViewSupplierPrice = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [sortedData, setSortedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [importQuantity, setImportQuantity] = useState(0);
  const [idImport, setIdImport] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const result = await getAllSuppliers(1, 100);
      if (result.isSuccess) {
        setSuppliers(result.result.data);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSupplierChange = (value) => {
    setSelectedSupplier(value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };

  const handleSortSubmit = async () => {
    try {
      console.log("selectedSupplier: ", selectedSupplier);
      setIsLoading(true);
      const result = await getLatestQuotationPriceBySupplierName(
        selectedSupplier,
        1,
        100
      );

      if (result.isSuccess) {
        setSortedData(result.result.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const openImportModal = (record) => {
    console.log("record: ", record);
    setIdImport(record.key);
    setImportModalVisible(true);
  };

  const closeImportModal = () => {
    setImportModalVisible(false);
  };

  const handleQuantityChange = (e) => {
    setImportQuantity(Number(e.target.value));
  };

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => index + 1,
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
      title: "Unit Material",
      dataIndex: "unitMaterial",
      key: "unitMaterial",
      render: (unitMaterial) => {
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
      },
    },
    {
      title: "Material Type",
      dataIndex: "materialType",
      key: "materialType",
      render: (materialType) =>
        materialType === 0 ? "Raw Materials" : "Furniture",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          className="bg-blue-500 text-white"
          onClick={() => openImportModal(record)}
          loading={isLoading}
        >
          Import
        </Button>
      ),
    },
  ];

  const data = sortedData.map((item, index) => ({
    key: item.id,
    index,
    moq: item.moq,
    materialName: item.material.name,
    price: item.price,
    unitMaterial: item.material.unitMaterial,
    materialType: item.material.materialType,
  }));

  const handleImportSubmit = async () => {
    try {
      setIsLoading(true);
      const importResult = await importMaterial(importQuantity, idImport);
      if (importResult.isSuccess) {
        toast.success("Material imported successfully");
      } else {
        const errorMessage = importResult.messages.join(", ");
        toast.error(`Failed to import material. Error: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
      closeImportModal();
    }
  };

  return (
    <div className="flex flex-col p-8 text-gray-900">
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
            <Select
              id="supplier"
              placeholder="Select Supplier"
              style={{ width: "100%" }}
              onChange={handleSupplierChange}
              value={
                selectedSupplier ? selectedSupplier.supplierName : undefined
              }
            >
              {suppliers.map((supplier) => (
                <Option key={supplier.id} value={supplier.supplierName}>
                  {supplier.supplierName}
                </Option>
              ))}
            </Select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Select Date
            </label>
            <DatePicker
              style={{ width: "100%" }}
              onChange={handleDateChange}
              placeholder="Select Date"
              disabledDate={disabledDate}
            />
          </div>

          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSortSubmit}
          >
            Sort
          </Button>
        </div>

        <div className="col-span-2">
          {/* Display Sorted Data using Ant Design Table */}
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 7 }}
            loading={isLoading}
          />
        </div>

        <Modal
          title="Import Material"
          open={importModalVisible}
          onOk={handleImportSubmit}
          onCancel={closeImportModal}
        >
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <Input
              id="quantity"
              type="number"
              value={importQuantity}
              onChange={handleQuantityChange}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ViewSupplierPrice;
