import axios from "axios";
import { baseURL, usertoken } from ".";

export const getAllNews = async (pageIndex, pageSize) => {
  try {
    const res = await axios.post(
      `${baseURL}/news/get-all?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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

export const createNews = async (formData) => {
  try {
    const res = await axios.post(`${baseURL}/news/create-news`, formData, {
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

export const updateNews = async (updateData) => {
  try {
    const res = await axios.put(`${baseURL}/news/update-news`, updateData, {
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

export const deleteNewsById = async (newsId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/news/delete-news-by-id/${newsId}`,
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

export const getNewsById = async (newsId) => {
  try {
    const res = await axios.get(`${baseURL}/news/get-news-by-id/${newsId}`, {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error("Error fetching news by id:", err);
    return null;
  }
};
