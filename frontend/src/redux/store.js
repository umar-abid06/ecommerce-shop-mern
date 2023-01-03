import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import orderSlice from "./order/orderSlice";
import productDetailsSlice from "./products/productDetailsSlice";
import productsSlice from "./products/productsSlice";
import userAuthSlice from "./user/userAuthSlice";
import userDetailsSlice from "./user/userDetailsSlice";
import userRegisterSlice from "./user/userRegisterSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    productDetails: productDetailsSlice,
    cart: cartSlice,
    userAuth: userAuthSlice,
    userRegister: userRegisterSlice,
    userDetails: userDetailsSlice,
    orderCreate: orderSlice,
  },
});

export default store;
