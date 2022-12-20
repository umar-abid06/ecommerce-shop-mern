// import { put, call, takeEvery } from "redux-saga/effects";
// import { getProductsFailure, getProductsSuccess } from "./productsSlice";

// function* workGetProductsFetch() {
//   try {
//     const products = yield call(() =>
//       fetch("http://localhost:5000/api/v1/products")
//     );
//     const formattedProducts = yield products.json();
//     yield put(getProductsSuccess(formattedProducts));
//   } catch (error) {
//     yield put(getProductsFailure(error));
//   }
// }

// export function* productsSaga() {
//   yield takeEvery("products/getProductsFetch", workGetProductsFetch);
// }

// // function* workGetSaleProductsFetch() {
// //   const cats = yield call(() =>
// //     fetch("https://fakestoreapi.com/products?sort=desc")
// //   );
// //   const formattedCats = yield cats.json();
// //   const formattedShortenedCats = formattedCats.slice(0, 20);
// //   yield put(getSaleProductsSuccess(formattedShortenedCats));
// // }

// // export function* saleProductSaga() {
// //   yield takeEvery("products/getSaleProductsFetch", workGetSaleProductsFetch);
// // }
