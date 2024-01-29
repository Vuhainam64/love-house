import axios from "axios";
const baseURL = "https://hcqs-backend.azurewebsites.net";

export const getAllBlogs = async (fieldName, ascending) => {
  try {
      const res = await axios.post(`${baseURL}/blog/get-all`, []);
      return res.data;
  } catch (err) {
      return null;
  }
};

export const getBlogDetail = async (Id) => {
  try {
      const res = await axios.get(`${baseURL}/blog/get-blog-by-id/${Id}`);
      return res.data;
  } catch (err) {
      return null;
  }
};
