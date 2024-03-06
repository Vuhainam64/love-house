import axios from "axios";
import {
    baseURL,
    usertoken
} from ".";

export const createProjectByUser = async (projectData) => {
    try {
        const res = await axios.post(`${baseURL}/project/create-project-by-user`, projectData, {
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

export const configProject = async (configData) => {
    try {
        const res = await axios.put(`${baseURL}/project/config-project`, configData, {
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

export const getAllProjects = async (status) => {
    try {
        const res = await axios.get(`${baseURL}/project/get-all-project?status=${status}`, {
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

export const getProjectById = async (projectId) => {
    try {
        const res = await axios.get(`${baseURL}/project/get-project-by-id/${projectId}`, {
            headers: {
                Authorization: `Bearer ${usertoken}`,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        console.error("Error fetching project by id:", err);
        return null;
    }
};
