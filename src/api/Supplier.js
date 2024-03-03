import axios from "axios";
import {
    baseURL,
    usertoken
} from ".";

export const createSupplier = async (supplierData) => {
    try {
        const res = await axios.post(`${baseURL}/supplier/create-supplier`, supplierData, {
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

export const updateSupplier = async (updateData) => {
    try {
        const res = await axios.put(`${baseURL}/supplier/update-supplier`, updateData, {
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

export const importSupplierFromExcelSheet = async (excelData) => {
    try {
        const res = await axios.post(`${baseURL}/supplier/import-supplier-from-excelsheet`, excelData, {
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

export const deleteSupplierById = async (supplierId) => {
    try {
        const res = await axios.delete(`${baseURL}/supplier/delete-supplier-by-id/${supplierId}`, {
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

export const getSupplierById = async (supplierId) => {
    try {
        const res = await axios.get(`${baseURL}/supplier/get-supplier-by-id/${supplierId}`, {
            headers: {
                Authorization: `Bearer ${usertoken}`,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        console.error("Error fetching supplier by id:", err);
        return null;
    }
};

export const getAllSuppliers = async (pageIndex, pageSize, sortField, sortOrder) => {
    try {
        const res = await axios.post(`${baseURL}/supplier/get-all?pageIndex=${pageIndex}&pageSize=${pageSize}`, [], {
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

export const getSupplierTemplate = async () => {
    try {
        const res = await axios.get(`${baseURL}/supplier/get-supplier-template`, {
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
        link.download = "Supplier.xlsx";
        link.click();

        return "Success";
    } catch (err) {
        return null;
    }
};