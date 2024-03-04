import axios from "axios";

const baseURL = "https://hcqs-backend.azurewebsites.net";
export const usertoken = localStorage.accessToken;

export const getContractById = async (contractId) => {
  try {
    const res = await axios.get(`${baseURL}/contract/get-contract-by-id/${contractId}`, {
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


export const signContract = async (data) => {
  try {
    const res = await axios.put(
      `${baseURL}/contract/sign-contract?contractId=${data.contractId}&accountId=${data.accountId}&verificationCode=${data.verificationCode}`,
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
    console.error("Error sign contract:", err);
    throw err;
  }
};

export const getContractProgressById = async (contractId) => {
  try {
    const res = await axios.get(`${baseURL}/contract-progress-payment/get-contract-progress-payment-by-contractId/${contractId}`, {
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

export const resendVerificationCodeByContractId = async (contractId) => {
  try {
    console.log(usertoken)
    const res = await axios.put(`${baseURL}/contract/resend-verification-code-by-contractId/${contractId}`, null, {
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

export const createContractProgress = async (createData) => {
  try {
    const res = await axios.post(
      `${baseURL}/contract-progress-payment/create-contract-progress-payment`,
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
    console.error("Error create contract progress:", err);
    throw err;
  }
};

export const deleteContractProgressById = async (id) => {
  try {
    const res = await axios.delete(
      `${baseURL}/contract-progress-payment/delete-contract-progress-payment-by-contract-id/${id}`,
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