import axios from "axios";

import {
  baseURL,
  path,
  getProducts,
  getSingleProduct,
  userLogin,
  userProfile,
  userRegistration,
  userProfileUpdate,
} from "../constants/constants";

const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async () => {
  try {
    const response = await api.get(`${path}/${getProducts}`);
    if (response.data.length) {
      return response.data;
    }
  } catch (error) {
    return error.response.data;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`${path}/${getSingleProduct}/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const fetchProduct = async (params) => {
  const { id, qty } = params;
  try {
    const response = await api.get(`${path}/${getSingleProduct}/${id}`);

    return { ...response.data, qty };
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (payload) => {
  try {
    const { data } = await api.post(`${path}/${userLogin}`, payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
export const signup = async (payload) => {
  try {
    const { data } = await api.post(`${path}/${userRegistration}`, payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
const findToken = () => {
  var { token } = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser"))
    : "";
  console.log(token);
  return token;
};
// const config = {
// headers: {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${token? }`,
// },
// };
export const getUserDetails = async () => {
  let token = findToken();
  try {
    const { data } = await api.get(`${path}/${userProfile}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};
export const updateUserProfile = async (payload) => {
  let token = findToken();
  try {
    const { data } = await api.put(`${path}/${userProfile}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};
