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
    console.log({ ...response.data, qty });
    return { ...response.data, qty };
  } catch (error) {
    return error.response.data;
  }
};
