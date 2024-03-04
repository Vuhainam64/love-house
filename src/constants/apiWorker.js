import axios from "axios";

const baseURL = "https://hcqs-backend.azurewebsites.net";
export const usertoken = localStorage.accessToken;

export const getAllWorker = async () => {
  try {
    const res = await axios.get(`${baseURL}/worker/get-all`, {
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

export const getWokerById = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}/worker/get-by-id/${id}`, {
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


export const createWorkerPrice = async (createData) => {
  try {
    const res = await axios.post(
      `${baseURL}/worker/create-worker-price`,
      createData, {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error create :", err);
    throw err;
  }
};

export const updateWorkerPrice = async (updateData) => {
  try {
    const res = await axios.put(
      `${baseURL}/worker/update-worker-price`,
      updateData, {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error update:", err);
    throw err;
  }
};

export const deleteWorkerPrice = async (id) => {
  try {
    const res = await axios.delete(
      `${baseURL}/worker/delete-worker-price-by-id/${id}`, {
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