import axios from "axios";
const baseURL = "https://hcqs-backend.azurewebsites.net";

export const getAllWorker = async (fieldName, ascending) => {
    try {
        const res = await axios.get(`${baseURL}/worker/get-all`, []);
        return res.data;
    } catch (err) {
        return null;
    }
  };