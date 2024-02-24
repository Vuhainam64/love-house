import axios from "axios";
import {
    baseURL,
    usertoken
} from ".";

// Get all roles
export const getAllRoles = async () => {
    try {
        const res = await axios.get(`${baseURL}/role/get-all-role`, {
            headers: {
                Authorization: `Bearer ${usertoken}`,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        console.error("Error fetching all roles:", err);
        return null;
    }
};

// Assign role for user
export const assignRoleForUser = async (userId) => {
    try {
        const res = await axios.put(`${baseURL}/role/assign-role-for-user`, null, {
            headers: {
                Authorization: `Bearer ${usertoken}`,
            },
            params: {
                userId: userId,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        console.error("Error assigning role for user:", err);
        return null;
    }
};

// Remove role for user
export const removeRoleForUser = async (userId) => {
    try {
        const res = await axios.delete(`${baseURL}/role/remove-role-for-user`, {
            headers: {
                Authorization: `Bearer ${usertoken}`,
            },
            params: {
                userId: userId,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        console.error("Error removing role for user:", err);
        return null;
    }
};
