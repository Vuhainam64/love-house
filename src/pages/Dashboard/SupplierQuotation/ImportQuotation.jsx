import React, { useEffect, useState } from "react";
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
  validExcelFile,
} from "../../../api";
import DataTableFalse from "../../../components/Dashboard/DataTableFalse";
import { useSelector } from "react-redux";

const ImportQuotation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [excelData, setExcelData] = useState([]);

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
    const validData = data.validData.map(
      ({ No, MaterialName, Unit, MOQ, Price }) => ({
        No,
        MaterialName,
        Unit,
        MOQ,
        Price,
      })
    );

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
      const uploadResponse = await validExcelFile(formData);
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
        const uploadResponse2 = await uploadSupplierQuotationWithExcelFile(
          formData
        );
        toast.success("Upload successful: " + uploadResponse2.date);
      } else {
        toast.error("Upload Fail: Please check file error ");
        getUploadSupplierQuotationWithExcelFileError(formData);
      }
      console.log("uploadResponse: ", uploadResponse.result.data.isValidated);
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
        <div className="text-2xl text-green-400 font-semibold py-4">
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
      {
        rule: "regex",
        value: "^(Kg|M3|Bar|Item)$",
        errorMessage: "Unit include Kg|M3|Bar|Item",
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
      {
        rule: "regex",
        value: "^[1-9]\\d*$",
        errorMessage: "MOQ > 0",
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
      {
        rule: "regex",
        value: "^(?!0+(\\.0*)?$)([1-9]\\d*|0)(\\.\\d+)?$",
        errorMessage: "Price > 0",
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
