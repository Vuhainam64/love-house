import axios from "axios";
import {
    baseURL,
    usertoken
} from ".";

export const validExcelFile = async (excelData) => {
    try {
        const res = await axios.post(`${baseURL}/supplier-price-quotation/valid-excel-file`, excelData, {
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

export const uploadSupplierQuotationWithExcelFile = async (excelData) => {
    try {
        const res = await axios.post(`${baseURL}/supplier-price-quotation/upload-supplier-quotation-with-excel-file`, excelData, {
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

export const getUploadSupplierQuotationWithExcelFileError = async (excelData) => {
    try {
        const res = await axios.post(`${baseURL}/supplier-price-quotation/upload-supplier-quotation-with-excel-file`, excelData, {
            headers: {
                Authorization: `Bearer ${usertoken}`,
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
            responseType: "blob",
        });

        // Create a Blob from the response data
        const blob = new Blob([res.data], {
            type: res.headers["content-type"]
        });

        // Create a link element and trigger a download
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "SupplierPriceQuotationError.xlsx";
        link.click();
    } catch (err) {
        return null;
    }
};

export const deleteSupplierQuotationById = async (quotationId) => {
    try {
        const res = await axios.delete(`${baseURL}/supplier-price-quotation/delete-supplier-quotation-by-id`, {
            params: {
                Id: quotationId,
            },
            headers: {
                Authorization: `Bearer ${usertoken}`,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        return null;
    }
};

export const getAllSupplierQuotations = async (pageIndex, pageSize) => {
    try {
        const res = await axios.post(`${baseURL}/supplier-price-quotation/get-all?pageIndex=${pageIndex}&pageSize=${pageSize}`, [], {
            headers: {
                Authorization: `Bearer ${usertoken}`,
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        return null;
    }
};

export const getAllSupplierQuotationsByMonth = async (month, year, pageIndex, pageSize) => {
    try {
        const res = await axios.post(`${baseURL}/supplier-price-quotation/get-all-by-month?month=${month}&year=${year}&pageIndex=${pageIndex}&pageSize=${pageSize}`, [], {
            headers: {
                Authorization: `Bearer ${usertoken}`,
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        return null;
    }
};

export const getSupplierQuotationTemplate = async () => {
    try {
        const res = await axios.get(`${baseURL}/supplier-price-quotation/get-supplier-price-quotation-template`, {
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
        link.download = "SupplierPriceQuotationTemplate.xlsx";
        link.click();

        return "Success";
    } catch (err) {
        return null;
    }
};