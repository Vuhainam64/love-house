import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { MdClose } from "react-icons/md";

import { buttonClick } from "../../../assets/animations";
import { getMaterialById, updateMaterial } from "../../../api";
import { FaPencilAlt } from "react-icons/fa";

const EditMaterial = ({ setIsEdit, refreshData, selectedMaterialId }) => {
  const [materialData, setMaterialData] = useState({
    name: "",
    unitMaterial: 0,
    materialType: 0,
    quantity: 0,
  });

  useEffect(() => {
    async function fetchMaterial() {
      try {
        const response = await getMaterialById(selectedMaterialId);
        if (response && response.isSuccess) {
          setMaterialData(response.result.data);
        }
        console.log("materialData: ", materialData);
      } catch (error) {
        console.error("Error fetching material:", error);
      }
    }

    fetchMaterial();
  }, [selectedMaterialId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterialData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      const response = await updateMaterial(materialData);
      if (response && response.isSuccess) {
        toast.success("Material updated successfully");
        refreshData();
      } else {
        toast.error("Error updating material");
      }
    } catch (error) {
      console.error("Error updating material:", error);
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
        <div className="font-semibold py-4 text-xl">Edit Material</div>

        <div className="w-full">
          <label className="text-gray-700 font-semibold text-sm">
            Material Name
            <span className="text-red-500 required-dot">*</span>
          </label>
          <div className="flex items-center w-full h-full px-4 py-1 rounded-lg border-gray-300 border bg-white my-2">
            <input
              type="text"
              name="name"
              placeholder="Material Name"
              value={materialData.name}
              onChange={handleChange}
              className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg"
            />
          </div>

          <label className="text-gray-700 font-semibold text-sm">
            Material Type
            <span className="text-red-500 required-dot">*</span>
          </label>
          <select
            name="materialType"
            value={materialData.unitMaterial}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 mt-2"
          >
            <option value="0">Raw Materials</option>
            <option value="1">Furniture</option>
            {/* Add other options as needed */}
          </select>

          <label className="text-gray-700 font-semibold text-sm">
            Unit Material
            <span className="text-red-500 required-dot">*</span>
          </label>
          <select
            name="unitMaterial"
            value={materialData.materialType}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 mt-2"
          >
            <option value="0">Kg</option>
            <option value="1">M3</option>
            <option value="2">Bar</option>
            <option value="3">Item</option>
          </select>

          <label className="text-gray-700 font-semibold text-sm">
            Quantity
            <span className="text-red-500 required-dot">*</span>
          </label>
          <div className="flex items-center w-full h-full px-4 py-1 rounded-lg border-gray-300 border bg-white my-2">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={materialData.quantity}
              onChange={handleChange}
              className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg"
            />
          </div>
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

export default EditMaterial;
