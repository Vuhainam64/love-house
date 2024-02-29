import axios from "axios";
import {
    baseURL,
    usertoken
} from ".";

export const getQuotationDetailById = async (id) => {
    try {
        const res = await axios.get(`${baseURL}/quotation-detail/get-quotation-detail-by-id/${id}`, {
            headers: {
                Authorization: `Bearer ${usertoken}`,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        console.error("Error fetching quotation detail by id:", err);
        return null;
    }
};

export const getQuotationDetailByQuotationId = async (id) => {
    try {
        const res = await axios.get(`${baseURL}/quotation-detail/get-quotation-detail-by-quotation-id/${id}`, {
            headers: {
                Authorization: `Bearer ${usertoken}`,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        console.error("Error fetching quotation detail by quotation id:", err);
        return null;
    }
};

export const getAllApprovedQuotationDetailsByProjectId = async (id) => {
    try {
        const res = await axios.get(`${baseURL}/quotation-detail/get-all-approved-quotation-detail-by-project-id/${id}`, {
            headers: {
                Authorization: `Bearer ${usertoken}`,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        console.error("Error fetching all approved quotation details by project id:", err);
        return null;
    }
};

export const createListQuotationDetail = async (quotationDetails) => {
    try {
        const res = await axios.post(`${baseURL}/quotation-detail/create-list-quotation-detail`, quotationDetails, {
            headers: {
                Authorization: `Bearer ${usertoken}`,
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        console.error("Error creating list of quotation details:", err);
        return null;
    }
};

export const updateQuotationDetail = async (quotationDetail) => {
    try {
        const res = await axios.put(`${baseURL}/quotation-detail/update-quotation-detail`, quotationDetail, {
            headers: {
                Authorization: `Bearer ${usertoken}`,
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        console.error("Error updating quotation detail:", err);
        return null;
    }
};

export const deleteQuotationDetailById = async (id) => {
    try {
        const res = await axios.delete(`${baseURL}/quotation-detail/delete-quotation-detail-by-id/${id}`, {
            headers: {
                Authorization: `Bearer ${usertoken}`,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        console.error("Error deleting quotation detail by id:", err);
        return null;
    }
};