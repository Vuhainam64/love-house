import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import { IoPricetagsSharp } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";

import { DataTable } from "../../../components";
import { buttonClick } from "../../../assets/animations";
import { ImportExcel } from "../../../assets";
import {
  getSupplierQuotationTemplate,
  getUploadSupplierQuotationWithExcelFileError,
  uploadSupplierQuotationWithExcelFile,
} from "../../../api";

const ImportQuotation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const downloadExample = async () => {
    try {
      const response = await getSupplierQuotationTemplate();
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
      const uploadResponse = await uploadSupplierQuotationWithExcelFile(
        formData
      );

      if (uploadResponse.date) {
        toast.success("Upload successful: " + uploadResponse.date);
      } else {
        toast.error("Upload Fail: Please check file error " );
        getUploadSupplierQuotationWithExcelFileError(formData);
      }
    } catch (error) {
      toast.error("Error during upload:", error);
    }
  };

  return (
    <div className="flex flex-col p-8 ">
      {/* title */}
      <div>
        <div className="flex items-center space-x-2 text-xl">
          <IoPricetagsSharp />
          <div>Supplier</div>
          <FaChevronRight />
          <div>Price Quotation</div>
          <FaChevronRight />
        </div>
        <div className="text-2xl text-orange-400 font-semibold py-4">
          Import Quotation
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

      <div className="my-4">
        <img src={ImportExcel} alt="gif" className="rounded-xl" />
      </div>
      <DataTable
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        fields={fields}
      />
    </div>
  );
};

export default ImportQuotation;

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
    label: "Unit",
    key: "Unit",
    fieldType: {
      type: "input",
    },
    example: "Bar",
    validations: [
      {
        rule: "required",
        errorMessage: "Unit is required",
        level: "error",
      },
    ],
  },
  {
    label: "MOQ",
    key: "MOQ",
    fieldType: {
      type: "input",
    },
    example: "1000",
    validations: [
      {
        rule: "required",
        errorMessage: "MOQ is required",
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
    example: "9",
    validations: [
      {
        rule: "required",
        errorMessage: "Price is required",
        level: "error",
      },
    ],
  },
];
