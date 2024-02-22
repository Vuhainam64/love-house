import axios from "axios";
import { baseURL, usertoken } from ".";

export const createMaterial = async (materialData) => {
  try {
    const response = await axios.post(
      `${baseURL}/material/create-material`,
      materialData,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating material:", error);
    return null;
  }
};

export const updateMaterial = async (materialData) => {
  try {
    const response = await axios.put(
      `${baseURL}/material/update-material`,
      materialData,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating material:", error);
    return null;
  }
};

export const updateMaterialQuantity = async (id, addQuantity) => {
  try {
    const response = await axios.put(
      `${baseURL}/material/update-material-quantity?id=${id}&addQuantity=${addQuantity}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating material quantity:", error);
    return null;
  }
};

export const deleteMaterialById = async (id) => {
  try {
    const response = await axios.delete(
      `${baseURL}/material/delete-material-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting material:", error);
    return null;
  }
};

export const getMaterialById = async (id) => {
  try {
    const response = await axios.get(
      `${baseURL}/material/get-material-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error getting material by ID:", error);
    return null;
  }
};

export const getMaterialByName = async (name) => {
  try {
    const response = await axios.get(
      `${baseURL}/material/get-material-by-name/${name}`,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error getting material by name:", error);
    return null;
  }
};

export const getAllMaterials = async (pageIndex = 1, pageSize = 100) => {
  try {
    const response = await axios.post(
      `${baseURL}/material/get-all?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      [],
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error getting all materials:", error);
    return null;
  }
};
