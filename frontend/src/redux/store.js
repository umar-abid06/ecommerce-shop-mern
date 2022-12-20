import { configureStore } from "@reduxjs/toolkit";
import productDetailsSlice from "./products/productDetailsSlice";
import productsSlice from "./products/productsSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    productDetails: productDetailsSlice,
  },
});

export default store;
