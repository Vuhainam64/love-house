import axios from "axios";
import { baseURL, usertoken } from ".";

export const getAllBlog = async (pageIndex, pageSize) => {
  try {
    const res = await axios.post(
      `${baseURL}/blog/get-all?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      [],
      {
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

export const createBlog = async (formData) => {
  try {
    const res = await axios.post(`${baseURL}/blog/create-blog`, formData, {
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

export const updateBlog = async (updateData) => {
  try {
    const res = await axios.put(`${baseURL}/blog/update-blog`, updateData, {
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

export const deleteBlogById = async (blogId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/blog/delete-blog-by-id/${blogId}`,
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

export const getBlogById = async (blogId) => {
  try {
    const res = await axios.get(`${baseURL}/blog/get-blog-by-id/${blogId}`, {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error("Error fetching blog by id:", err);
    return null;
  }
};
