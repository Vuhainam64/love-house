import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Button, Input, Pagination, Popconfirm, Space, Table } from "antd";
import * as XLSX from "xlsx";

import { GrSupport } from "react-icons/gr";
import { FaChevronRight } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import {
  getAllSuppliers,
  deleteSupplierById,
  importSupplierFromExcelSheet,
  getSupplierTemplate,
} from "../../../api";
import ConfirmPopup from "../../../components/Dashboard/ConfirmPopup";
import { buttonClick } from "../../../assets/animations";
import CreateSupplier from "./CreateSupplier";
import EditSupplier from "./EditSupplier";
import { DataTable, MutatingDots } from "../../../components";
import { FaRegEdit } from "react-icons/fa";

const ViewSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentSuppliers, setCurrentSuppliers] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [isImport, setIsImport] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllSuppliers(1, 100);
        if (response && response.isSuccess) {
          setSuppliers(response.result.data);
        }
      } catch (error) {
        toast.error("Error fetching suppliers:", error);
        setSuppliers([]);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (suppliers) {
      const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setTotalItems(filteredSuppliers.length);

      setCurrentSuppliers([]);
      const firstItem = currentPage * itemsPerPage - itemsPerPage;
      if (firstItem >= filteredSuppliers.length) return;

      const lastIndex = Math.min(
        firstItem + itemsPerPage,
        filteredSuppliers.length
      );
      setCurrentSuppliers(filteredSuppliers.slice(firstItem, lastIndex));
    }
  }, [currentPage, itemsPerPage, suppliers, searchTerm]);

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      const updatedSuppliers = await getAllSuppliers(1, 100);
      if (updatedSuppliers && updatedSuppliers.isSuccess) {
        setSuppliers(updatedSuppliers.result.data);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteConfirmation) {
      try {
        const response = await deleteSupplierById(deleteConfirmation);
        if (response && response.isSuccess) {
          toast.success("Supplier deleted successfully");
          refreshData();
        } else {
          toast.error("Error deleting supplier");
        }
      } catch (error) {
        toast.error("Error deleting supplier:", error);
      } finally {
        closeDeleteConfirmation();
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const openEditSupplier = (supplierId) => {
    setSelectedSupplierId(supplierId);
    setIsEdit(true);
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
    formData.append("file", blob, "SauChien_20122023.xlsx");
    console.log("data: ", data);
    try {
      const uploadResponse = await importSupplierFromExcelSheet(formData);
      if (uploadResponse.date) {
        toast.success("Upload successful: " + uploadResponse.date);
      } else {
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(uploadResponse);
        downloadLink.download = "SauChien_20122023_error.xlsx";
        downloadLink.click();
      }
    } catch (error) {
      toast.error("Error during upload:", error);
    }
  };

  const downloadExample = async () => {
    try {
      const response = await getSupplierTemplate();
      if (response === "Success") {
        toast.success("Download successful");
      } else {
        toast.error("Download failed");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "supplierName",
      key: "supplierName",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) =>
        text === 0
          ? "Contruction Material"
          : text === 1
          ? "Furniture Supplier"
          : "Both",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle" align="center">
          <Popconfirm
            title="Are you sure delete this supplier?"
            onConfirm={() => confirmDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" size="small" icon={<MdDelete />} />
          </Popconfirm>
          <Button
            style={{ backgroundColor: "#1890ff", color: "#fff" }}
            size="small"
            icon={<FaRegEdit />}
            onClick={() => openEditSupplier(record.id)}
          />
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <MutatingDots />
        </div>
      ) : (
        <div className="relative flex flex-col p-8 text-gray-900">
          {/* title */}
          <div>
            <div className="flex items-center space-x-2 text-xl">
              <GrSupport />
              <div>Supplier </div>
              <FaChevronRight />
              <div>Supplier</div>
              <FaChevronRight />
            </div>
            <div className="text-2xl text-orange-400 font-semibold py-4">
              View Supplier
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="px-2 font-semibold">Search</div>
              <Input
                type="text"
                className="border px-2 py-1 w-80"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex flex-wrap space-x-2">
              <motion.div
                {...buttonClick}
                onClick={downloadExample}
                className="px-4 py-2 border rounded-md text-white bg-green-500 hover:bg-green-600 font-semibold shadow-md cursor-pointer"
              >
                Download Sample
              </motion.div>
              <motion.div
                {...buttonClick}
                onClick={() => setIsImport(true)}
                className="px-4 py-2 border rounded-md text-white bg-blue-500 hover:bg-blue-600 font-semibold shadow-md cursor-pointer"
              >
                Import Supplier
              </motion.div>
              <motion.div
                {...buttonClick}
                onClick={() => setIsCreate(true)}
                className="px-4 py-2 border rounded-md text-white bg-orange-500 hover:bg-orange-600 font-semibold shadow-md cursor-pointer"
              >
                Create Supplier
              </motion.div>
            </div>
          </div>

          {/* Supplier Table */}
          <Table
            columns={columns}
            dataSource={currentSuppliers}
            pagination={false}
          />
        </div>
      )}

      {/* create suplier  */}
      {isCreate && (
        <div>
          <CreateSupplier setIsCreate={setIsCreate} refreshData={refreshData} />
        </div>
      )}

      {/* edit supplier */}
      {isEdit && (
        <div>
          <EditSupplier
            setIsEdit={setIsEdit}
            refreshData={refreshData}
            selectedSupplierId={selectedSupplierId}
          />
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmation && (
        <ConfirmPopup
          message="Are you sure you want to delete this supplier?"
          onConfirm={confirmDelete}
          onCancel={closeDeleteConfirmation}
        />
      )}

      {/* import supplier  */}
      <DataTable
        isOpen={isImport}
        onClose={() => setIsImport(false)}
        onSubmit={handleSubmit}
        fields={fields}
      />
    </>
  );
};

export default ViewSupplier;

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
    label: "SupplierName",
    key: "SupplierName",
    fieldType: {
      type: "input",
    },
    example: "Supplier1",
    validations: [
      {
        rule: "required",
        errorMessage: "Supplier Name is required",
        level: "error",
      },
    ],
  },
  {
    label: "Type",
    key: "Type",
    fieldType: {
      type: "input",
    },
    example: "1",
    validations: [
      {
        rule: "required",
        errorMessage: "Type is required",
        level: "error",
      },
    ],
  },
];
