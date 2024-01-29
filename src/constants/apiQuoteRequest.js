import axios from "axios";
const baseURL = "https://hcqs-backend.azurewebsites.net";

export const quoteRequest = async (userData, accountId) => {
  try {
    const formData = new FormData();

   
    formData.append("NumOfFloor", userData.numoffloor);
    formData.append("Area", userData.totalArea);
    formData.append("LandDrawingFile", userData.landDrawingFile); 
    formData.append("AccountId", accountId);
 

 
    const res = await axios.post(`${baseURL}/project/create-project-by-user`, formData, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, 
      },
    });

    return res.data;
  } catch (err) {
    return null;
  }
};
