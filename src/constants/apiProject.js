import axios from "axios";
const baseURL = "https://hcqs-backend.azurewebsites.net";

export const getAllProjects = async (fieldName, ascending) => {
  try {
    const res = await axios.post(`${baseURL}/sample-project/get-all`, []);
    return res.data;
  } catch (err) {
    return null;
  }
};