import axios from "axios";
import {
    baseURL,
    usertoken
} from ".";

export const getRemainQuantityForFulfillment = async (QuotationDetailId) => {
    try {
        const res = await axios.get(
            `${baseURL}/progress-construction-material/get-remain-quantity-for-fulfillment-by-quotation-detail-Id/${QuotationDetailId}`, {
                params: {
                    QuotationDetailId,
                },
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (err) {
        console.error("Error fetching quotation detail by id:", err);
        return null;
    }
};

export const updateProgressConstructionMaterial = async (id, quantity, quotationDetailId) => {
    try {
        const res = await axios.put(
            `${baseURL}/progress-construction-material/update-progress-construction-material`, {
                id,
                quantity,
                quotationDetailId,
            }, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (err) {
        console.error("Error updating progress construction material:", err);
        return null;
    }
};

export const createProgressConstructionMaterial = async (quotationDetailId, quantity) => {
    try {
        const res = await axios.post(
            `${baseURL}/progress-construction-material/create-progress-construction-material`, [{
                quotationDetailId,
                quantity,
            }], {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (err) {
        console.error("Error updating progress construction material:", err);
        return null;
    }
};