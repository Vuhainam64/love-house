import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Table, Input, Space, Button } from "antd";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import { MdInventory } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";

import { buttonClick } from "../../../assets/animations";
import { DataTable, MutatingDots } from "../../../components";
import {
  getAllImportInventory,
  getAllInventory,
  getImportMaterialTemplate,
  getImportMaterialWithExcelError,
  importMaterialWithExcel,
  validInventoryExcelFile,
} from "../../../api";
import DataTableFalse from "../../../components/Dashboard/DataTableFalse";
import moment from "moment";

const ImportInventory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inventoryData, setInventoryData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isError, setIsError] = useState(false);
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getAllImportInventory(1, 100);

        if (data) {
          setInventoryData(data.result.data);
          setIsLoading(false);
        } else {
          console.error("Error fetching inventory data");
        }
      } catch (error) {
        console.error("Error during data fetch:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ backgroundColor: "#ffc069" }}>
          {text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, "i"))
            .map((fragment, i) =>
              fragment.toLowerCase() === searchText.toLowerCase() ? (
                <span key={i} className="highlight">
                  {fragment}
                </span>
              ) : (
                fragment
              )
            )}
        </span>
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "no",
      render: (text, record) =>
        inventoryData.findIndex((item) => item.id === record.id) + 1,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      key: "supplierName",
      render: (text, record) => {
        return record.supplierPriceDetail.supplierPriceQuotation.supplier
          .supplierName;
      },
    },
    {
      title: "Material Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return record.supplierPriceDetail.material.name;
      },
    },
    {
      title: "Unit Material",
      dataIndex: "unitMaterial",
      key: "unitMaterial",
      render: (text, record) => {
        return record.supplierPriceDetail.material.unitMaterial === 0
          ? "KG"
          : record.supplierPriceDetail.material.unitMaterial === 1
          ? "M3"
          : record.supplierPriceDetail.material.unitMaterial === 2
          ? "BAR"
          : "ITEM";
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      ...getColumnSearchProps("quantity"),
    },
  ];

  const downloadExample = async () => {
    try {
      const response = await getImportMaterialTemplate();
      if (response === "Success") {
        toast.success("Download successful");
      } else {
        toast.error("Download failed");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  const handleSubmit = async (data, file) => {
    const validData = data.validData;
    const sheetData = [
      Object.keys(validData[0]),
      ...validData.map((item) => Object.values(item)),
    ];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const formData = new FormData();
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based
    const year = currentDate.getFullYear().toString();

    const formattedDate = `${day}${month}${year}`;
    formData.append("file", blob, `${formattedDate}.xlsx`);

    console.log("formattedDate: ", formattedDate);

    try {
      const uploadResponse = await validInventoryExcelFile(formData);
      if (!uploadResponse.result.data.isValidated) {
        const errors = uploadResponse.result.data.errors;
        const updatedExcelData = validData.map((item, index) => ({
          ...item,
          Error: errors[index] || "",
        }));
        setIsError(true);
        setExcelData(updatedExcelData);
        console.log("excelData", updatedExcelData);
      }
      if (uploadResponse.result.data.isValidated) {
        const uploadResponse2 = await importMaterialWithExcel(formData);
        toast.success("Upload successful: " + uploadResponse2.date);
      } else {
        toast.error("Upload Fail: Please check file error ");
        getImportMaterialWithExcelError(formData);
      }
      console.log("uploadResponse: ", uploadResponse.result.data.isValidated);
    } catch (error) {
      toast.error("Error during upload:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <MutatingDots />
        </div>
      ) : (
        <div className="flex flex-col p-8 pb-32 mb-12 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {/* title */}
          <div>
            <div className="flex items-center space-x-2 text-xl">
              <MdInventory />
              <div>Import Export</div>
              <FaChevronRight />
              <div>Inventory</div>
              <FaChevronRight />
            </div>
            <div className="text-2xl text-green-400 font-semibold py-4">
              Import Inventory
            </div>
          </div>

          <div className="flex flex-wrap justify-start pb-6 ">
            <motion.div
              {...buttonClick}
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 border rounded-md text-white bg-gray-500 hover:bg-gray-600 font-semibold shadow-md cursor-pointer"
            >
              Open Flow
            </motion.div>

            <motion.div
              {...buttonClick}
              onClick={downloadExample}
              className="px-4 py-2 border rounded-md text-white bg-blue-500 hover:bg-blue-600 font-semibold shadow-md cursor-pointer"
            >
              Dowload Example
            </motion.div>
          </div>

          <div>
            {/* Ant Design Table */}
            <Table
              columns={columns}
              dataSource={inventoryData}
              pagination={{ pageSize: 7 }}
            />
          </div>

          <DataTableFalse
            isOpen={isError}
            onClose={() => setIsError(false)}
            onSubmit={handleSubmit}
            excelData={excelData}
            fields={fields}
          />

          <DataTable
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSubmit={handleSubmit}
            fields={fields}
          />
        </div>
      )}
    </>
  );
};

export default ImportInventory;

const fields = [
  {
    label: "No",
    key: "No",
    fieldType: {
      type: "input",
    },
    example: "1",
    validations: [
      {
        rule: "unique",
        errorMessage: "No is unique",
        level: "error",
      },
      {
        rule: "regex",
        value: "^[0-9]+$",
        errorMessage: "No is a number",
        level: "error",
      },
    ],
  },
  {
    label: "MaterialName",
    key: "MaterialName",
    fieldType: {
      type: "input",
    },
    example: "Brick",
    validations: [
      {
        rule: "required",
        errorMessage: "Material Name is required",
        level: "error",
      },
      {
        rule: "regex",
        value: "^[a-zA-Z]+$",
        errorMessage: "Material is a text",
        level: "error",
      },
    ],
  },
  {
    label: "SupplierName",
    key: "SupplierName",
    fieldType: {
      type: "input",
    },
    example: "Sau Chien",
    validations: [
      {
        rule: "required",
        errorMessage: "SupplierName is required",
        level: "error",
      },
      {
        rule: "regex",
        value: "^[a-zA-Z]+( [a-zA-Z]+)?$",
        errorMessage: "SupplierName is a text",
        level: "error",
      },
    ],
  },
  {
    label: "Quantity",
    key: "Quantity",
    fieldType: {
      type: "input",
    },
    example: "1000",
    validations: [
      {
        rule: "required",
        errorMessage: "Quantity is required",
        level: "error",
      },
      {
        rule: "regex",
        value: "^[1-9]\\d*$",
        errorMessage: "MOQ > 0",
        level: "error",
      },
    ],
  },
  {
    label: "Error",
    key: "Error",
    fieldType: {
      type: "input",
    },
    example: " ",
    validations: [
      {
        rule: "regex",
        value: "^ *$",
        errorMessage: "Check the error row",
        level: "error",
      },
    ],
  },
];
