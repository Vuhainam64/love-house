import axios from "axios";
import {
    baseURL,
    usertoken
} from ".";

export const createExportPriceMaterial = async (materialId, price) => {
    try {
        const res = await axios.post(
            `${baseURL}/export-price-material/create-export-price-material`, {
                price,
                materialId
            }, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const updateExportPriceMaterial = async (id, price, materialId) => {
    try {
        const res = await axios.post(
            `${baseURL}/export-price-material/update-export-price-material`, {
                id,
                price,
                materialId
            }, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const importExportPriceMaterialFromExcelSheet = async (excelData) => {
    try {
        const res = await axios.post(
            `${baseURL}/export-price-material/import-export-price-material-from-excelsheet`, excelData, {
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

export const getImportExportPriceMaterialFromExcelSheetError = async (excelData) => {
    try {
        const res = await axios.post(`${baseURL}/export-price-material/import-export-price-material-from-excelsheet`, excelData, {
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
        link.download = "SupplierPriceQuotationTemplate.xlsx";
        link.click();
    } catch (err) {
        return null;
    }
};

export const deleteExportPriceMaterialById = async (id) => {
    try {
        const res = await axios.delete(
            `${baseURL}/export-price-material/delete-export-price-material-by-id/${id}`, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getExportPriceMaterialById = async (id) => {
    try {
        const res = await axios.get(
            `${baseURL}/export-price-material/get-export-price-material-by-id/${id}`, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getAllExportPriceMaterial = async (pageIndex, pageSize) => {
    try {
        const res = await axios.post(
            `${baseURL}/export-price-material/get-all-export-price-material`,
            [], {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getLatestExportPriceMaterial = async (pageIndex, pageSize) => {
    try {
        const res = await axios.post(
            `${baseURL}/export-price-material/get-latest-export-price-material`,
            [], {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getExportPriceMaterialTemplate = async () => {
    try {
        const res = await axios.get(
            `${baseURL}/export-price-material/get-export-price-material-template`, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
                responseType: "blob",
            }
        );

        // Create a Blob from the response data
        const blob = new Blob([res.data], {
            type: res.headers["content-type"],
        });

        // Create a link element and trigger a download
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "SupplierPriceQuotationTemplate.xlsx";
        link.click();
    } catch (err) {
        return null;
    }
};