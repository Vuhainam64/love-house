import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import { GrSupport } from "react-icons/gr";
import { FaChevronRight } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import {
  getAllSuppliers,
  deleteSupplierById,
  importSupplierFromExcelSheet,
} from "../../../api";
import { DataTable, MutatingDots, Pagination } from "../../../components";
import ConfirmPopup from "../../../components/Dashboard/ConfirmPopup";
import { FaRegEdit } from "react-icons/fa";
import { buttonClick } from "../../../assets/animations";
import CreateSupplier from "./CreateSupplier";
import EditSupplier from "./EditSupplier";

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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const chooseItemPerPage = (itemNumber) => {
    setItemsPerPage(itemNumber);
    setCurrentPage(1);
  };

  const openDeleteConfirmation = (supplierId) => {
    setDeleteConfirmation(supplierId);
  };

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
          // Refresh data or update state after successful deletion
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
    // Extracting valid data from the data object
    const validData = data.validData;

    // Creating a 2D array with headers and valid data
    const sheetData = [
      Object.keys(validData[0]),
      ...validData.map((item) => Object.values(item)),
    ];

    // Creating a worksheet
    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // Creating a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

    // Creating an array buffer
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Creating a Blob from the array buffer
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a FormData object to append the Blob
    const formData = new FormData();
    formData.append("file", blob, "SauChien_20122023.xlsx");

    console.log("data: ", data);
    try {
      // Upload the file using your API function
      const uploadResponse = await importSupplierFromExcelSheet(formData);

      if (uploadResponse.date) {
        toast.success("Upload successful: " + uploadResponse.date);
      } else {
        // Create a download link
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(uploadResponse);
        downloadLink.download = "SauChien_20122023_error.xlsx";
        downloadLink.click();
      }
    } catch (error) {
      toast.error("Error during upload:", error);
    }
  };

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
              <input
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
                // onClick={() => setIsImport(true)}
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
          <table className="min-w-full bg-white border border-gray-300 ">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-2 px-4 border-b border-gray-300">Name</th>
                <th className="py-2 px-4 border-b border-gray-300">Type</th>
                <th className="py-2 px-4 border-b border-gray-300">Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentSuppliers.map((supplier, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-orange-100`}
                >
                  <td className="py-2 px-4 border-b border-gray-300 text-center">
                    {supplier.supplierName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center">
                    {supplier.type === 0
                      ? "Contruction Material"
                      : (supplier.type = 1 ? "Furniture Supplier" : "Both")}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <MdDelete
                        className="cursor-pointer text-xl text-red-400 hover:text-red-500"
                        onClick={() => openDeleteConfirmation(supplier.id)}
                      />
                      <FaRegEdit
                        onClick={() => openEditSupplier(supplier.id)}
                        className="cursor-pointer text-xl text-blue-400 hover:text-blue-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="w-full p-5">
            {totalItems && (
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                paginate={paginate}
                choseItemPerPage={chooseItemPerPage}
              />
            )}
          </div>
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
