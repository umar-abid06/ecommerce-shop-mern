import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import productDetailsSlice from "./products/productDetailsSlice";
import productsSlice from "./products/productsSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    productDetails: productDetailsSlice,
    cart: cartSlice,
  },
});

export default store;
