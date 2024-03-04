import axios from "axios";

const baseURL = "https://hcqs-backend.azurewebsites.net";
export const usertoken = localStorage.accessToken;

export const getUrlVnpay = async (paymentId) => {
    try {
      const res = await axios.get(`${baseURL}/payment/create-payment-url-vnpay?paymentId=${paymentId}`, {
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
  export const getUrlMomo = async (paymentId) => {
    try {
      const res = await axios.get(`${baseURL}/payment/create-payment-url-momo?paymentId=${paymentId}`, {
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