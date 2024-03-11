import React, { useEffect, useState } from "react";
import { Table, Space, Modal, Input } from "antd";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import { FaChevronRight } from "react-icons/fa";
import { SiMaterialdesignicons } from "react-icons/si";

import {
  getAllMaterials,
  getExportPriceMaterialTemplate,
  getLatestExportPriceMaterial,
  importExportPriceMaterialFromExcelSheet,
} from "../../../api";
import { buttonClick } from "../../../assets/animations";
import { DataTable } from "../../../components";
import {
  createExportPriceMaterial,
  getAllExportPriceMaterial,
  getImportExportPriceMaterialFromExcelSheetError,
} from "../../../api/ExportPriceMaterial";
import ExportPriceHistoryPopup from "./ExportPriceHistoryPopup";

const ExportPrice = () => {
  const [exportPriceData, setExportPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [allMaterialsData, setAllMaterialsData] = useState([]);
  const [allExportPriceMaterialsData, setAllExportPriceMaterialsData] =
    useState([]);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [updatePriceData, setUpdatePriceData] = useState({
    id: "",
    price: 0,
  });
  const [historyPopupVisible, setHistoryPopupVisible] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLatestExportPriceMaterial();
        setExportPriceData(response.result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching export price data:", error);
      }
    };

    const fetchMaterialsData = async () => {
      try {
        const materialsResponse = await getAllMaterials();
        setAllMaterialsData(materialsResponse.result.data);
      } catch (error) {
        console.error("Error fetching all materials:", error);
      }
    };

    const fetchAllExportPriceMaterialData = async () => {
      try {
        const materialsResponse = await getAllExportPriceMaterial();
        setAllExportPriceMaterialsData(materialsResponse.result.data);
      } catch (error) {
        console.error("Error fetching all materials:", error);
      }
    };

    fetchAllExportPriceMaterialData();
    fetchData();
    fetchMaterialsData();
  }, []);

  console.log("allExportPriceMaterialsData: ", allExportPriceMaterialsData);
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "no",
      render: (text, record) =>
        exportPriceData.findIndex((item) => item.id === record.id) + 1,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Material ID",
      dataIndex: "materialId",
      key: "materialId",
    },
    {
      title: "Material Name",
      dataIndex: "materialId",
      key: "materialName",
      render: (materialId) => {
        // Find the material data based on materialId
        const material = allMaterialsData.find((m) => m.id === materialId);
        return material ? material.name : "Unknown Material";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <button
            onClick={() => viewDetailHandler(record.materialId)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View History
          </button>
          <button
            onClick={() => showUpdateModal(record.id)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Price
          </button>
        </Space>
      ),
    },
  ];

  const downloadExample = async () => {
    try {
      const response = await getExportPriceMaterialTemplate();
      toast.success("Download successful");
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
      const uploadResponse = await importExportPriceMaterialFromExcelSheet(
        formData
      );
      if (uploadResponse[0].date) {
        toast.success("Upload successful: " + uploadResponse[0].date);
      } else {
        toast.error("Upload Fail: Please check file error ");
        getImportExportPriceMaterialFromExcelSheetError(formData);
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  const showUpdateModal = (id) => {
    // Find the selected record based on ID
    const selectedRecord = exportPriceData.find((record) => record.id === id);

    // Assuming materialId is defined in the scope
    setUpdatePriceData({
      id,
      materialId: selectedRecord ? selectedRecord.materialId : 0,
      price: selectedRecord ? selectedRecord.price : 0,
    });

    setIsUpdateModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      // Call the API to update the export price
      await createExportPriceMaterial(
        updatePriceData.materialId,
        updatePriceData.price
      );
      // Refresh the data after update
      const response = await getLatestExportPriceMaterial();
      setExportPriceData(response.result.data);
      // Close the update modal
      setIsUpdateModalVisible(false);
      toast.success("Update successful");
    } catch (error) {
      console.error("Error updating export price:", error);
      toast.error("Update failed");
    }
  };

  const viewDetailHandler = (materialId) => {
    // Show the history popup and set the selected materialId
    setHistoryPopupVisible(true);
    setSelectedMaterialId(materialId);
  };

  const closeHistoryPopup = () => {
    // Close the history popup
    setHistoryPopupVisible(false);
    setSelectedMaterialId(null);
  };

  return (
    <div className="flex flex-col pb-32 mb-12 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
      {/* title */}
      <div>
        <div className="flex items-center space-x-2 text-xl">
          <SiMaterialdesignicons />
          <div>Import Export</div>
          <FaChevronRight />
          <div>Material</div>
          <FaChevronRight />
        </div>
        <div className="text-2xl text-green-400 font-semibold py-4">
          Export Price
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

      {/* Table */}
      <Table
        columns={columns}
        dataSource={exportPriceData}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <DataTable
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        fields={fields}
      />

      {/* Update Modal */}
      <Modal
        title="Update Price"
        open={isUpdateModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsUpdateModalVisible(false)}
      >
        <div>
          <label>Material Name:</label>
          <span>
            {allMaterialsData.find((m) => m.id === updatePriceData.materialId)
              ?.name || "Unknown Material"}
          </span>
        </div>
        <div>
          <label>New Price:</label>
          <Input
            type="number"
            value={updatePriceData.price}
            onChange={(e) =>
              setUpdatePriceData({
                ...updatePriceData,
                price: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>
      </Modal>

      {/* History Popup */}
      <ExportPriceHistoryPopup
        visible={historyPopupVisible}
        onClose={closeHistoryPopup}
        materialId={selectedMaterialId}
        exportPrices={allExportPriceMaterialsData}
      />
    </div>
  );
};

export default ExportPrice;

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
        rule: "required",
        errorMessage: "No is required",
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
    label: "Price",
    key: "Price",
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
