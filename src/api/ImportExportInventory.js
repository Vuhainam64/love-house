import axios from "axios";
import {
  baseURL,
  usertoken
} from ".";

export const getAllInventory = async (pageIndex, pageSize) => {
  try {
    const res = await axios.post(
      `${baseURL}/import-export-inventory/get-all?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      [], {
        headers: {
          Authorization: `Bearer ${usertoken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

export const getAllImportInventory = async (pageIndex, pageSize) => {
  try {
    const res = await axios.post(
      `${baseURL}/import-export-inventory/get-all-import?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      [], {
        headers: {
          Authorization: `Bearer ${usertoken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

export const getAllExportByQuotationDetailId = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}/import-export-inventory/get-all-export-by-quotation-detail-id/${id}`, {
        headers: {
          Authorization: `Bearer ${usertoken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};


export const getAllExportInventory = async (pageIndex, pageSize) => {
  try {
    const res = await axios.post(
      `${baseURL}/import-export-inventory/get-all-export?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      [], {
        headers: {
          Authorization: `Bearer ${usertoken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

export const getImportMaterialTemplate = async () => {
  try {
    const res = await axios.get(`${baseURL}/import-export-inventory/get-import-material-template`, {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
      responseType: "blob",
    });

    // Create a Blob from the response data
    const blob = new Blob([res.data], {
      type: res.headers["content-type"]
    });

    // Create a link element and trigger a download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "ImportInventoryTemplate.xlsx";
    link.click();

    return "Success";
  } catch (err) {
    return null;
  }
};

export const importMaterialWithExcel = async (excelData) => {
  try {
    const res = await axios.post(`${baseURL}/import-export-inventory/import-material-with-excel`, excelData, {
      headers: {
        Authorization: `Bearer ${usertoken}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    return null;
  }
};

export const getImportMaterialWithExcelError = async (excelData) => {
  try {
    const res = await axios.post(`${baseURL}/import-export-inventory/import-material-with-excel`, excelData, {
      headers: {
        Authorization: `Bearer ${usertoken}`,
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    });

    // Create a Blob from the response data
    const blob = new Blob([res.data], {
      type: res.headers["content-type"]
    });

    // Create a link element and trigger a download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "ImportInventoryError.xlsx";
    link.click();
  } catch (err) {
    return null;
  }
};

export const validInventoryExcelFile = async (excelData) => {
  try {
    const res = await axios.post(`${baseURL}/import-export-inventory/valid-excel-file`, excelData, {
      headers: {
        Authorization: `Bearer ${usertoken}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    return null;
  }
};

export const importMaterial = async (quantity, supplierPriceDetailId) => {
  try {
    const res = await axios.post(
      `${baseURL}/import-export-inventory/import-material`,
      [{
        quantity,
        supplierPriceDetailId
      }], {
        headers: {
          Authorization: `Bearer ${usertoken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};