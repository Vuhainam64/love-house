import axios from "axios";
import {
    baseURL,
    usertoken
} from ".";

export const createSampleProject = async (sampleProjectData) => {
    try {
        const res = await axios.post(
            `${baseURL}/sample-project/create-sample-project`,
            sampleProjectData, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (err) {
        console.error("Error creating sample project:", err);
        return null;
    }
};

export const updateSampleProject = async (updateData) => {
    try {
        const res = await axios.put(`${baseURL}/sample-project/update-sample-project`, updateData, {
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


export const deleteSampleProjectById = async (projectId) => {
    try {
        const res = await axios.delete(
            `${baseURL}/sample-project/delete-sample-project-by-id/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (err) {
        console.error("Error deleting sample project:", err);
        return null;
    }
};

export const getSampleProjectById = async (projectId) => {
    try {
        const res = await axios.get(
            `${baseURL}/sample-project/get-sample-project-by-id/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (err) {
        console.error("Error fetching sample project by id:", err);
        return null;
    }
};
export const getAllSampleProjects = async (pageIndex, pageSize) => {
    try {
        const res = await axios.post(
            `${baseURL}/sample-project/get-all?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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
