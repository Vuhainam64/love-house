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
  getAllInventory,
  getImportMaterialTemplate,
  getImportMaterialWithExcelError,
  importMaterialWithExcel,
} from "../../../api";

const ImportInventory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inventoryData, setInventoryData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getAllInventory(1, 100);

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
            .map(
              (fragment, i) =>
                fragment.toLowerCase() === searchText.toLowerCase() ? (
                  <span key={i} className="highlight">
                    {fragment}
                  </span>
                ) : (
                  fragment
                ) // Highlight matched text
            )}
        </span>
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      ...getColumnSearchProps("quantity"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
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
      const uploadResponse = await importMaterialWithExcel(formData);
      if (uploadResponse[0].date) {
        toast.success("Upload successful: " + uploadResponse[0].date);
      } else {
        toast.error("Upload Fail: Please check file error ");
        getImportMaterialWithExcelError(formData);
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <MutatingDots />
        </div>
      ) : (
        <div className="flex flex-col p-8">
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

          <div className="flex flex-wrap justify-start">
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
              pagination={{ pageSize: 10 }} // Adjust pageSize as needed
            />
          </div>

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
    ],
  },
];
