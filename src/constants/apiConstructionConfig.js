import axios from "axios";
const baseURL = "https://hcqs-backend.azurewebsites.net";
export const usertoken = localStorage.accessToken;
console.log(usertoken)
export const getConstructionConfig = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/construction-config/get-construction-config`,
      data,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

export const searchConstructionConfig = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/construction-config/search-construction-config`,
      data,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};
export const getAllConstructionConfig = async () => {
  try {
    const res = await axios.get(
      `${baseURL}/construction-config/get-all`,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};
export const getMaxConfig = async (num) => {
  try {
    const res = await axios.get(
      `${baseURL}/construction-config/get-max-config?ConstructionType=${num}`,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

export const createConstructionConfig = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/construction-config/create-construction-config`,
      data,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};
export const updateConstructionConfig = async (data) => {
  try {
    const res = await axios.put(
      `${baseURL}/construction-config/update-construction-config`,
      data,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

export const deleteConstructionConfig = async (id) => {
  try {
    const res = await axios.delete(
      `${baseURL}/construction-config/delete-construction-config/${id}`,
      {
    
        headers: {
          "Content-Type": "application/json", // Specify content type as application/json
          // Optionally, you can include other headers such as Authorization
          Authorization: `Bearer ${usertoken}`,
        },
        // Optionally, you can include additional configurations like withCredentials
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};
