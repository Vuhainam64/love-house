import axios from "axios";

const baseURL = "https://hcqs-backend.azurewebsites.net";
export const usertoken = localStorage.accessToken;

export const quoteRequest = async (userData, accountId) => {
  try {
    const formData = new FormData();

    formData.append("NumOfFloor", userData.numOfFloor);
    formData.append("Area", userData.area);
    formData.append("LandDrawingFile", userData.landDrawingFileUrl);
    formData.append("Type", userData.constructionType);
    formData.append("AddressProject", userData.address);
    formData.append("AccountId", accountId);

    const res = await axios.post(
      `${baseURL}/project/create-project-by-user`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (err) {
    return null;
  }
};

// export const createQuotationRequest = async (formData) => {
//   try {
//     const res = await axios.post(`${baseURL}/project/create-project-by-user`, formData, {
//       headers: {
//         Authorization: `Bearer ${usertoken}`,
//         "Content-Type": "multipart/form-data",
//       },
//       withCredentials: true,
//     });

//     return res.data;
//   } catch (err) {
//     return null;
//   }
// };

export const getAllRequest = async (accountId, status) => {
  try {
    const res = await axios.get(
      `${baseURL}/project/get-all-project-by-accountId/${accountId}?status=${status}`,
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
export const getAllExportByQuotationDetailId = async (Id) => {
  try {
    const res = await axios.get(
      `${baseURL}/import-export-inventory/get-all-export-by-quotation-detail-id/${Id}`,
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
export const getProjectByIdForCustomer = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}/project/get-project-by-id-for-customer/${id}`,
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

export const getQuoteDetailForCustomer = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}/quotation/get-quotation-by-id/${id}`,
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

export const createQuotationDealRequest = async (createData) => {
  try {
    const res = await axios.post(
      `${baseURL}/quotation/create-quotation-dealing-request`,
      createData,
      {
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

export const dealQuotation = async ({ quotationId, status }) => {
  try {
    const res = await axios.post(
      `${baseURL}/quotation/deal-quotation?status=${status}`,
      `${quotationId}`,
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
    console.error("Error dealing with quotation:", err);
    throw err;
  }
};
