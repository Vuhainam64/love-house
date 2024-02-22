import axios from "axios";
const baseURL = "https://hcqs-backend.azurewebsites.net";
export const usertoken = localStorage.accessToken;

export const getAllMaterial = async (fieldName, ascending) => {
  try {
    const res = await axios.post(`${baseURL}/material/get-all`, []);
    return res.data;
  } catch (err) {
    return null;
  }
};