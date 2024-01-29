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

// export const getHouseRoof = async (fieldName, ascending) => {
//   try {
//     const params = {
//       // Add parameters for filtering by projectType
//       projectType: 1,
//       // You can add more parameters here if needed
//     };

//     const res = await axios.post(`${baseURL}/sample-project/get-all`, params);
//     return res.data;
//   } catch (err) {
//     return null;
//   }
// };

export const getProjectDetail = async (Id) => {
  try {
      const res = await axios.get(`${baseURL}/sample-project/get-sample-project-by-id/${Id}`);
      return res.data;
  } catch (err) {
      return null;
  }
};