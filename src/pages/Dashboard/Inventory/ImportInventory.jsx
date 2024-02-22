import React, { useState } from "react";
import { motion } from "framer-motion";

import { MdInventory } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";

import { buttonClick } from "../../../assets/animations";
import { getImportMaterialTemplate } from "../../../api";

const ImportInventory = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
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
        <div className="text-2xl text-orange-400 font-semibold py-4">
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
    </div>
  );
};

export default ImportInventory;
