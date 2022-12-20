import axios from "axios";
import { useCallback } from "react";

import {
  baseURL,
  path,
  getProducts,
  getSingleProduct,
} from "../constants/constants";

const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Accept: "application/json",
  },
});

export const fetchProducts = async () => {
  try {
    const response = await api.get(`${path}/${getProducts}`);
    console.log(response);
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
    console.log(response);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
