import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { MdClose } from "react-icons/md";

import { buttonClick } from "../../../assets/animations";
import { getSupplierById, updateSupplier } from "../../../api";
import { FaPencilAlt } from "react-icons/fa";

const EditSupplier = ({ setIsEdit, refreshData, selectedSupplierId }) => {
  const [supplierData, setSupplierData] = useState({
    supplierName: "",
    type: 0,
  });

  useEffect(() => {
    async function fetchSupplier() {
      try {
        const response = await getSupplierById(selectedSupplierId);
        if (response && response.isSuccess) {
          setSupplierData(response.result.data);
        }
        console.log("supplierData: ", supplierData);
      } catch (error) {
        console.error("Error fetching supplier:", error);
      }
    }

    fetchSupplier();
  }, [selectedSupplierId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      const response = await updateSupplier(supplierData);
      if (response && response.isSuccess) {
        toast.success("Supplier updated successfully");
        refreshData();
      } else {
        toast.error("Error updating supplier");
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
    } finally {
      setIsEdit(false);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border p-8 rounded-xl">
      <div className="flex flex-col items-center justify-center">
        <motion.div
          {...buttonClick}
          onClick={() => setIsEdit(false)}
          className="flex items-center justify-end w-full cursor-pointer"
        >
          <MdClose className="text-2xl" />
        </motion.div>
        <div className="border rounded-full p-6 bg-yellow-400 text-white">
          <FaPencilAlt className="text-2xl" />
        </div>
        <div className="font-semibold py-4 text-xl">Edit Supplier</div>

        <div className="w-full">
          <label className="text-gray-700 font-semibold text-sm">
            Supplier Name
            <span className="text-red-500 required-dot">*</span>
          </label>
          <div className="flex items-center w-full h-full px-4 py-1 rounded-lg border-gray-300 border bg-white my-2">
            <input
              type="text"
              name="supplierName"
              placeholder="Supplier Name"
              value={supplierData.supplierName}
              onChange={handleChange}
              className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg"
            />
          </div>

          <label className="text-gray-700 font-semibold text-sm">
            Type
            <span className="text-red-500 required-dot">*</span>
          </label>
          <select
            name="type"
            value={supplierData.type}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 mt-2"
          >
            <option value="0">Type 0</option>
            {/* Add other options as needed */}
          </select>
        </div>
        <motion.div
          {...buttonClick}
          onClick={handleEdit}
          className="px-4 py-2 border rounded-md text-white bg-blue-500 hover:bg-blue-600 font-semibold shadow-md cursor-pointer mt-8"
        >
          Update
        </motion.div>
      </div>
    </div>
  );
};

export default EditSupplier;
