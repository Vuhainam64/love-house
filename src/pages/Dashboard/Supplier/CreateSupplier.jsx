import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { FaPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

import { buttonClick } from "../../../assets/animations";
import { createSupplier } from "../../../api";

const CreateSupplier = ({ setIsCreate, refreshData }) => {
  const [supplierData, setSupplierData] = useState({
    supplierName: "",
    type: 0, // Default value for the type
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await createSupplier(supplierData);
      if (response && response.isSuccess) {
        toast.success("Supplier created successfully");
        refreshData();
      } else {
        if (response.messages && response.messages.length > 0) {
          const alreadyExistsMessage = "The supplier has already existed!";
          if (response.messages.includes(alreadyExistsMessage)) {
            toast.error(alreadyExistsMessage);
          } else {
            toast.error("Error creating supplier");
          }
        } else {
          toast.error("Error creating supplier");
        }
      }
    } catch (error) {
      console.error("Error creating supplier:", error);
    } finally {
      setIsCreate(false);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border p-8 rounded-xl">
      <div className="flex flex-col items-center justify-center">
        <motion.div
          {...buttonClick}
          onClick={() => setIsCreate(false)}
          className="flex items-center justify-end w-full cursor-pointer"
        >
          <MdClose className="text-2xl" />
        </motion.div>
        <div className="border rounded-full p-6 bg-orange-400 text-white">
          <FaPlus className="text-2xl" />
        </div>
        <div className="font-semibold py-4 text-xl">Create Supplier</div>

        <div className="w-full">
          <label className="text-gray-700 font-semibold text-sm">
            Supplier
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
            <option value="0">Contruction Material</option>
            <option value="1">Furniture Supplier</option>
            <option value="2">Both</option>
          </select>
        </div>
        <motion.div
          {...buttonClick}
          onClick={handleSubmit}
          className="px-4 py-2 border rounded-md text-white bg-gray-500 hover:bg-gray-600 font-semibold shadow-md cursor-pointer mt-8"
        >
          Create
        </motion.div>
      </div>
    </div>
  );
};

export default CreateSupplier;
