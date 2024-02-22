import axios from "axios";
import {
    baseURL,
    usertoken
} from ".";

// Function to get quotation price by material id
export const getQuotationPriceByMaterialId = async (materialId, pageIndex, pageSize) => {
    try {
        const res = await axios.post(
            `${baseURL}/supplier-price-detail/get-quotation-price-by-material-id/${materialId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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

// Function to get quotation price by supplier id
export const getQuotationPriceBySupplierId = async (supplierId, pageIndex, pageSize) => {
    try {
        const res = await axios.post(
            `${baseURL}/supplier-price-detail/get-quotation-price-by-supplier-id/${supplierId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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

// Function to get quotation price by material name
export const getQuotationPriceByMaterialName = async (materialName, pageIndex, pageSize) => {
    try {
        const res = await axios.post(
            `${baseURL}/supplier-price-detail/get-quotation-price-by-material-name/${materialName}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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

// Function to get quotation price by supplier name
export const getQuotationPriceBySupplierName = async (supplierName, pageIndex, pageSize) => {
    try {
        const res = await axios.post(
            `${baseURL}/supplier-price-detail/get-quotation-price-by-supplier-name/${supplierName}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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

// Function to get latest quotation price by material id
export const getLatestQuotationPriceByMaterialId = async (materialId, pageIndex, pageSize) => {
    try {
        const res = await axios.post(
            `${baseURL}/supplier-price-detail/get-latest-quotation-price-by-material-id/${materialId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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

// Function to get latest quotation price by supplier id
export const getLatestQuotationPriceBySupplierId = async (supplierId, pageIndex, pageSize) => {
    try {
        const res = await axios.post(
            `${baseURL}/supplier-price-detail/get-latest-quotation-price-by-supplier-id/${supplierId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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

// Function to get latest quotation price by material name
export const getLatestQuotationPriceByMaterialName = async (materialName, pageIndex, pageSize) => {
    try {
        const res = await axios.post(
            `${baseURL}/supplier-price-detail/get-latest-quotation-price-by-material-name/${materialName}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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

// Function to get latest quotation price by supplier name
export const getLatestQuotationPriceBySupplierName = async (supplierName, pageIndex, pageSize) => {
    try {
        const res = await axios.post(
            `${baseURL}/supplier-price-detail/get-latest-quotation-price-by-supplier-name/${supplierName}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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

// Function to get all quotation prices
export const getAllQuotationPrices = async (pageIndex, pageSize) => {
    try {
        const res = await axios.post(
            `${baseURL}/supplier-price-detail/get-all?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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