import axios from "axios";

const baseURL = "https://hcqs-backend.azurewebsites.net";
export const usertoken = localStorage.accessToken;

export const getAllRequestForStaff = async (status) => {
  try {
    const res = await axios.get(`${baseURL}/project/get-all-project?status=${status}`, {
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

export const getProjectById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/project/get-project-by-id/${id}`, {
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

export const updateProjectConfig = async (updateData) => {
  try {
    const res = await axios.put(
      `${baseURL}/project/config-project`,
      updateData, {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error updating project config:", err);
    throw err;
  }
};

export const getQuotationById = async (quotationId) => {
  try {
    const res = await axios.get(
      `${baseURL}/quotation/get-quotation-by-id/${quotationId}`, {
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


export const getQuoteDetailByQuoteId = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}/quotation-detail/get-quotation-detail-by-quotation-id/${id}`, {
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

export const createListQuotationDetail = async (createData) => {
  try {
    const res = await axios.post(
      `${baseURL}/quotation-detail/create-list-quotation-detail`,
      createData, {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error create quotation detail:", err);
    throw err;
  }
};

export const updateQuotationDetail = async (updateData) => {
  try {
    const res = await axios.put(
      `${baseURL}/quotation-detail/update-quotation-detail`,
      updateData, {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error update quotation detail:", err);
    throw err;
  }
};

export const deleteQuotationDetailById = async (id) => {
  try {
    const res = await axios.delete(
      `${baseURL}/quotation-detail/delete-quotation-detail-by-id/${id}`, {
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

export const publicQuotationForCustomer = async (quotationId) => {
  try {
    const res = await axios.put(
      `${baseURL}/quotation/public-quotation-for-customer/${quotationId}`,
      null, {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error public quotation detail:", err);
    throw err;
  }
};

export const createDealByStaff = async (createData) => {
  try {
    const res = await axios.post(
      `${baseURL}/quotation/create-quotation-dealing-by-staff`,
      createData, {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error create quotation detail:", err);
    throw err;
  }
};